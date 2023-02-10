import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { JobsInfoComponent } from './components/jobs-info/jobs-info.component';
import { JobsModalComponent } from './components/jobs-modal/jobs-modal.component';
import { MatterModalComponent } from './components/matter-modal/matter-modal.component';
import { MattersTableComponent } from './components/matters-table/matters-table.component';
import { StatusInfoComponent } from './components/status-info/status-info.component';
import { IndeCXInterface } from './interfaces/inde-cx.interface';
import { JobsInfoInterface } from './interfaces/jobs-info.interface';
import { MatterInterface } from './interfaces/matter.interface';
import { StatusInfoInterface } from './interfaces/status-info.interface';
import { SettingService } from './services/setting.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MattersTableComponent,
    StatusInfoComponent,
    JobsInfoComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../../admin.component.scss'],
})
export class SettingsComponent {
  matters$: Observable<MatterInterface[]> | undefined;
  statusInfo$: Observable<StatusInfoInterface> | undefined;
  jobsInfo$: Observable<JobsInfoInterface> | undefined;

  private indeCX: IndeCXInterface[] = [];

  constructor(
    @SkipSelf() public dialog: MatDialog,
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: SettingService
  ) {}

  ngOnInit(): void {
    this.getMetters();
    this.getStatusInfo();
    this.getJobsInfo();
    this.getIndeCX();
  }

  handleMatterModal(): void {
    const dialogRef = this.dialog.open(MatterModalComponent, {
      disableClose: true,
      data: this.indeCX,
    });

    dialogRef.afterClosed().subscribe((result: MatterInterface) => {
      if (result) {
        this.saveMatter(result);
      }
    });
  }

  handleJobsInfoModal(): void {
    const dialogRef = this.dialog.open(JobsModalComponent);

    dialogRef.afterClosed().subscribe((result: JobsInfoInterface) => {
      if (result) {
        this.saveJobsInfo(result);
      }
    });
  }

  handleDelete(data: MatterInterface): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja remover este assunto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.removeMatter(data);
      }
    });
  }

  private getMetters(): void {
    this.matters$ = this.service.getMetters().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar assuntos.');
        return of([]);
      })
    );
  }

  private getStatusInfo(): void {
    this.statusInfo$ = this.service.getStatusInfo().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar os status.');
        return of({
          job: undefined,
          ixc: undefined,
          indeCx: undefined,
        });
      })
    );
  }

  private getJobsInfo(): void {
    this.jobsInfo$ = this.service.getJobsInfo().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro a carregar as configurações do job.');
        return of({
          runtime: undefined,
          lastRun: undefined,
        });
      })
    );
  }

  private getIndeCX(): void {
    this.service.getIndeCX().subscribe({
      next: (data: IndeCXInterface[]) => {
        this.indeCX = data;
      },
      error: () => {
        this.showSnackBar('Erro ao carregar IndeCX.');
      },
    });
  }

  private saveMatter(data: MatterInterface): void {
    this.service.saveMatter(data).subscribe({
      next: () => {
        this.getMetters();
        this.showSnackBar('Assunto salvo com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao salvar assunto!');
      },
    });
  }

  private saveJobsInfo(data: JobsInfoInterface): void {
    this.service.saveJobsInfo(data).subscribe({
      next: () => {
        this.getJobsInfo();
        this.showSnackBar('Configurações do job salva com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao salvar configurações do job!');
      },
    });
  }

  private removeMatter(data: MatterInterface): void {
    this.service.deleteMatter(data.id).subscribe({
      next: () => {
        this.getMetters();
        this.showSnackBar('Assunto removido com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao remover o assunto!');
      },
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
