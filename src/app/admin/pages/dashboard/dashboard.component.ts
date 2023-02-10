import { CommonModule } from '@angular/common';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';

import { IxcCxInfoComponent } from './components/ixc-cx-info/ixc-cx-info.component';
import { JobsInfoComponent } from './components/jobs-info/jobs-info.component';
import { RuntimeTableComponent } from './components/runtime-table/runtime-table.component';
import { JobsInfoInterface } from './interfaces/jobs-info.interface';
import { RuntimeInterface } from './interfaces/runtime.interface';
import { SystemInfoInterface } from './interfaces/system-info.interface';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RuntimeTableComponent,
    JobsInfoComponent,
    IxcCxInfoComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../admin.component.scss'],
})
export class DashboardComponent implements OnInit {
  runtime$: Observable<RuntimeInterface[]> | undefined;
  jobsInfo$: Observable<JobsInfoInterface> | undefined;
  indeCX$: Observable<SystemInfoInterface> | undefined;
  ixc$: Observable<SystemInfoInterface> | undefined;

  constructor(
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: DashboardService
  ) {}

  ngOnInit(): void {
    this.getRuntime();
    this.getJobsInfo();
    this.getIndeCX();
    this.getIxc();
  }

  private getRuntime(): void {
    this.runtime$ = this.service.getRuntime().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar ultima execuções.');
        return of([]);
      })
    );
  }

  private getJobsInfo(): void {
    this.jobsInfo$ = this.service.getJobsInfo().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar informações do JOB.');
        return of({ status: undefined, lastRun: undefined, dataTable: [] });
      })
    );
  }

  private getIndeCX(): void {
    this.indeCX$ = this.service.getIndeCX().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar informações do IndeCX.');
        return of({
          status: undefined,
          lastRun: undefined,
          numberErrors: undefined,
        });
      })
    );
  }

  private getIxc(): void {
    this.ixc$ = this.service.getIxc().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar informações do IXC.');
        return of({
          status: undefined,
          lastRun: undefined,
          numberErrors: undefined,
        });
      })
    );
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
