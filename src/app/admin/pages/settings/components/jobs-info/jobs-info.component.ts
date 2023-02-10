import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { JobsInfoInterface } from '../../interfaces/jobs-info.interface';

@Component({
  selector: 'app-jobs-info',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './jobs-info.component.html',
  styleUrls: ['./jobs-info.component.scss'],
})
export class JobsInfoComponent {
  @Input() jobsData!: JobsInfoInterface;
  @Output() jobsInfo = new EventEmitter<void>();

  handleJobsInfo(): void {
    this.jobsInfo.emit();
  }
}
