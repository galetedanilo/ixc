import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, SkipSelf } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
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
    displayName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(40)],
    ],
  });

  constructor(
    @SkipSelf() private builder: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<UserModalComponent>,
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