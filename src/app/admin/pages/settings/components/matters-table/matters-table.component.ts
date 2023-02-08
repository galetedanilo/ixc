import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatterInterface } from '../../interfaces/matter.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-matters-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './matters-table.component.html',
  styleUrls: ['./matters-table.component.scss'],
})
export class MattersTableComponent {
  @Input() dataTable: MatterInterface[] = [];
  @Output() remove = new EventEmitter();

  readonly displayedColumns = ['matter', 'matterId', 'actions'];

  handleRemove(data: MatterInterface): void {
    this.remove.emit(data);
  }
}
