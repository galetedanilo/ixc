import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { JobsComponent } from './components/jobs/jobs.component';

import { MatterModalComponent } from './components/matter-modal/matter-modal.component';
import { MattersTableComponent } from './components/matters-table/matters-table.component';
import { StatusComponent } from './components/status/status.component';
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
    JobsComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../../admin.component.scss'],
})
export class SettingsComponent {
  matters$: Observable<MatterInterface[]> | undefined;
  status$: Observable<StatusInterface> | undefined;

  constructor(
    @SkipSelf() public dialog: MatDialog,
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: SettingService
  ) {}

  ngOnInit(): void {
    this.getMetters();
    this.getStatus();
  }

  handleOpenModal(data: MatterInterface): void {
    const dialogRef = this.dialog.open(MatterModalComponent, {
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((result: MatterInterface) => {
      if (result) {
        this.save(result);
      }
    });
  }

  handleDelete(data: MatterInterface): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja remover este assunto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.remove(data);
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

  private save(data: MatterInterface): void {
    this.service.save(data).subscribe({
      next: () => {
        this.getMetters();
        this.showSnackBar('Assunto salvo com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao salvar assunto!');
      },
    });
  }

  private remove(data: MatterInterface): void {
    this.service.delete(data.id).subscribe({
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
