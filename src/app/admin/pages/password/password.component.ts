import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PasswordFormComponent } from './components/password-form/password-form.component';
import { ChangePasswordInterface } from './interfaces/change-password.interface';
import { PasswordService } from './services/password.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, PasswordFormComponent, MatSnackBarModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss', '../../admin.component.scss'],
})
export class PasswordComponent {
  constructor(
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: PasswordService
  ) {}

  handleSavePassword(data: ChangePasswordInterface) {
    this.service.changePassword(data).subscribe({
      next: () => {
        this.showSnackBar('Sua senha foi alterada com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao alterar sua senha');
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
