import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, SkipSelf } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { getErrorMessage } from 'src/app/shared/helpers/field-error-mesage.helper';

import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './user-modal.component.html',
  styles: [],
})
export class UserModalComponent implements OnInit {
  form = this.builder.group({
    id: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(40),
      ],
    ],
    userName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
    ],
    isAdmin: [false],
  });

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @SkipSelf() private builder: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface
  ) {}

  ngOnInit(): void {
    this.form.setValue(this.data);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    return getErrorMessage(field);
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleSave(): void {
    this.dialogRef.close(this.form.value);
  }
}
