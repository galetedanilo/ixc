import { CommonModule } from '@angular/common';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { UserModalComponent } from './components/user-modal/user-modal.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserInterface } from './interfaces/user.interface';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    UserModalComponent,
    UsersTableComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<UserInterface[]> | undefined;

  constructor(
    @SkipSelf() public dialog: MatDialog,
    @SkipSelf() private snackBar: MatSnackBar,
    @SkipSelf() private service: UsersService
  ) {}

  ngOnInit(): void {
    this.listAll();
  }

  handleOpenModal(data: UserInterface): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((result: UserInterface) => {
      if (result) {
        this.save(result);
      }
    });
  }

  handleDelete(data: UserInterface): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja remover este usuário?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.remove(data);
      }
    });
  }

  private listAll(): void {
    this.users$ = this.service.listAll().pipe(
      catchError((_error) => {
        this.showSnackBar('Erro ao carregar usuários.');
        return of([]);
      })
    );
  }

  private save(data: UserInterface): void {
    this.service.save(data).subscribe({
      next: () => {
        this.listAll();
        this.showSnackBar('Usuário salvo com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao salvar usuário!');
      },
    });
  }

  private remove(data: UserInterface): void {
    this.service.delete(data.id).subscribe({
      next: () => {
        this.listAll();
        this.showSnackBar('Usuário removido com sucesso!');
      },
      error: () => {
        this.showSnackBar('Erro ao remover o usuário!');
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
