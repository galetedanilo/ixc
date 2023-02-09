import { CommonModule } from '@angular/common';
import { Component, Inject, SkipSelf } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { getErrorMessage } from 'src/app/shared/helpers/field-error-mesage.helper';

import { IndeCXInterface } from '../../interfaces/inde-cx.interface';

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
})
export class MatterModalComponent {
  form = this.builder.group({
    id: [''],
    matter: ['', [Validators.required]],
    matterId: ['', [Validators.required, Validators.maxLength(40)]],
  });

  constructor(
    private dialogRef: MatDialogRef<MatterModalComponent>,
    @SkipSelf() private builder: NonNullableFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IndeCXInterface[]
  ) {}

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    return getErrorMessage(field);
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleSave(): void {
    console.log(this.form.value)
    //this.dialogRef.close(this.form.value);
  }
}
