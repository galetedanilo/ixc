import { Component, Inject, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getErrorMessage } from 'src/app/shared/helpers/field-error-mesage.helper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-matter-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './matter-modal.component.html',
  styleUrls: ['./matter-modal.component.scss'],
})
export class MatterModalComponent {
  form = this.builder.group({
    id: [''],
    matter: ['', [Validators.required, Validators.maxLength(200)]],
    matterId: ['', [Validators.required, Validators.maxLength(40)]],
  });

  constructor(
    private dialogRef: MatDialogRef<MatterModalComponent>,
    @SkipSelf() private builder: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

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
