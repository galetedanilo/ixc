import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from 'src/app/core/storege/storage.service';
import { getErrorMessage } from 'src/app/shared/helpers/field-error-mesage.helper';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  form = this.builder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(40),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
  });

  hidePassword = true;
  loading = false;

  constructor(
    @SkipSelf() private builder: NonNullableFormBuilder,
    @SkipSelf() private router: Router,
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: AuthenticationService,
    @SkipSelf() private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.storage.clear();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    return getErrorMessage(field);
  }

  handleLogin(): void {
    this.loading = true;
    this.service.authentication(this.form.value).subscribe({
      next: (data) => {
        this.loading = false;
        this.storage.saveUser(data);
        this.redirectToHome();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.showErrorMessage(error.status);
      },
    });
  }

  private showErrorMessage(code: number) {
    switch (code) {
      case HttpStatusCode.BadRequest:
        this.onError('Usuário ou senha inválidas');
        break;

      default:
        this.onError('Não voi possivel fazer o login, tente mais tarde');
    }
  }

  private onError(errorMessage: string): void {
    this.snackBar.open(errorMessage, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private redirectToHome(): void {
    this.router.navigate(['/admin']);
  }
}
