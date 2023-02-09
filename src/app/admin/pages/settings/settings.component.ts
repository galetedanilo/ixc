import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { JobsModalComponent } from './components/jobs-modal/jobs-modal.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MatterModalComponent } from './components/matter-modal/matter-modal.component';
import { MattersTableComponent } from './components/matters-table/matters-table.component';
import { StatusComponent } from './components/status/status.component';
import { IndeCXInterface } from './interfaces/inde-cx.interface';
import { JobsInterface } from './interfaces/jobs.interface';
import { MatterInterface } from './interfaces/matter.interface';
import { StatusInterface } from './interfaces/status.interface';
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
    StatusComponent,
    JobsComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../../admin.component.scss'],
})
export class SettingsComponent {
  matters$: Observable<MatterInterface[]> | undefined;
  status$: Observable<StatusInterface> | undefined;
  jobs$: Observable<JobsInterface> | undefined;

  private indeCX: IndeCXInterface[] = [];

  constructor(
    @SkipSelf() public dialog: MatDialog,
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: SettingService
  ) {}

  ngOnInit(): void {
    this.getMetters();
    this.getStatus();
    this.getJobs();
    this.getIndeCX();
  }

  handleOpenModal(): void {
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

  handleJobsModal(): void {
    const dialogRef = this.dialog.open(JobsModalComponent);

    dialogRef.afterClosed().subscribe((result: JobsInterface) => {
      if (result) {
        this.saveJobs(result);
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

  private getStatus(): void {
    this.status$ = this.service.getStatus().pipe(
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

  private getJobs(): void {
    this.jobs$ = this.service.getJobs().pipe(
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

  private saveJobs(data: JobsInterface): void {
    this.service.saveJobs(data).subscribe({
      next: () => {
        this.getJobs();
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
