import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { JobsInfoInterface } from '../../interfaces/jobs-info.interface';
import { JobsTableComponent } from '../jobs-table/jobs-table.component';

@Component({
  selector: 'app-jobs-info',
  standalone: true,
  imports: [CommonModule, JobsTableComponent],
  templateUrl: './jobs-info.component.html',
  styleUrls: ['./jobs-info.component.scss'],
})
export class JobsInfoComponent {
  @Input() jobsInfo!: JobsInfoInterface;
}
