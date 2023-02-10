import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatusComponent } from 'src/app/admin/components/status/status.component';

import { JobsInfoInterface } from '../../interfaces/jobs-info.interface';
import { JobsTableComponent } from '../jobs-table/jobs-table.component';

@Component({
  selector: 'app-jobs-info',
  standalone: true,
  imports: [CommonModule, JobsTableComponent, StatusComponent],
  templateUrl: './jobs-info.component.html',
  styleUrls: ['./jobs-info.component.scss'],
})
export class JobsInfoComponent {
  @Input() jobsInfo!: JobsInfoInterface;
}
