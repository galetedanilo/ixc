import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { JobsInfoInterface } from '../../interfaces/jobs-info.interface';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-jobs-info',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './jobs-info.component.html',
  styleUrls: ['./jobs-info.component.scss'],
})
export class JobsInfoComponent {
  @Input() jobsData!: JobsInfoInterface;
  @Output() jobsInfo = new EventEmitter<void>();

  constructor(
    @SkipSelf() private service: SettingService,
    @SkipSelf() private snackBar: MatSnackBar,
  ) {}

    public executeJob() {
      this.service.executeJob().subscribe({
        next: () => {
          this.showSnackBar('Job executado com sucesso!');
        },
        error: () => {
          this.showSnackBar('Erro ao executar job!');
        },
      })
    }

    private showSnackBar(message: string): void {
      this.snackBar.open(message, '', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

  handleJobsInfo(): void {
    this.jobsInfo.emit();
  }
}
