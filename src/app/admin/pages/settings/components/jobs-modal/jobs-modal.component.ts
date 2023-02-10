import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { getErrorMessage } from 'src/app/shared/helpers/field-error-mesage.helper';

import { MatterModalComponent } from '../matter-modal/matter-modal.component';

@Component({
  selector: 'app-jobs-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './jobs-modal.component.html',
})
export class JobsModalComponent {
  form = new FormGroup({
    runtime: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      Validators.max(9999),
      Validators.min(0),
    ]),
  });

  constructor(private dialogRef: MatDialogRef<MatterModalComponent>) {}

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
