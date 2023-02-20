import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, SkipSelf } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from 'src/app/core/storege/storage.service';
import { getErrorMessage } from 'src/app/shared/helpers/field-error-mesage.helper';

import { passwordMatchValidator } from '../../helper/password-match.validator';
import { ChangePasswordInterface } from '../../interfaces/change-password.interface';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent {
  @Output() event = new EventEmitter<ChangePasswordInterface>();

  form = this.builder.group({
    oldPassword: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
    ],
    passwordGroup: this.builder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [passwordMatchValidator] }
    ),
  });

  constructor(
    @SkipSelf() private builder: NonNullableFormBuilder,
    @SkipSelf() private storageService: StorageService
    ) {}

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    return getErrorMessage(field);
  }

  handleSave(): void {
    const user = this.storageService.getUser();
    const passwordReset: ChangePasswordInterface = {
      id: user.user.id,
      oldPassword: this.form.get('oldPassword')!.value,
      newPassword: this.form.get('passwordGroup.password')!.value,
    };
    this.event.emit(passwordReset);
  }
}
