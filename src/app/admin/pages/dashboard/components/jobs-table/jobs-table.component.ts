import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { JobsInterface } from '../../interfaces/jobs.interface';

@Component({
  selector: 'app-jobs-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.scss']
})
export class JobsTableComponent {
  @Input() dataTable: JobsInterface[] = [];

  readonly displayedColumns = [
    'date',
    'time',
    'amount',
    'isManual',
  ];

}
