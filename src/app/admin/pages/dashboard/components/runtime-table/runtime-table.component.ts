import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { RuntimeInterface } from '../../interfaces/runtime.interface';

@Component({
  selector: 'app-runtime-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './runtime-table.component.html',
  styleUrls: ['./runtime-table.component.scss'],
})
export class RuntimeTableComponent {
  @Input() dataTable: RuntimeInterface[] = [];

  readonly displayedColumns = [
    'date',
    'time',
    'matter',
    'email',
    'matterId',
    'isManual',
    'displayName',
  ];
}
