import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { JobsInterface } from '../../interfaces/jobs.interface';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  @Input() jobsData!: JobsInterface;
  @Output() jobs = new EventEmitter<void>();

  handleJobs(): void {
    this.jobs.emit();
  }
}
