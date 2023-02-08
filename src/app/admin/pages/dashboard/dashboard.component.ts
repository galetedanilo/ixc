import { CommonModule } from '@angular/common';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';

import { RuntimeTableComponent } from './components/runtime-table/runtime-table.component';
import { RuntimeInterface } from './interfaces/runtime.interface';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RuntimeTableComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../admin.component.scss'],
})
export class DashboardComponent implements OnInit {
  runtime$: Observable<RuntimeInterface[]> | undefined;

  constructor(
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: DashboardService
  ) {}

  ngOnInit(): void {
    this.getRuntime();
  }

  private getRuntime(): void {
    this.runtime$ = this.service.getRuntime().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar ultima execuções.');
        return of([]);
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
