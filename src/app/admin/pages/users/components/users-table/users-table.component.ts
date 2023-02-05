import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() users: UserInterface[] = []
  @Output() editUser = new EventEmitter();
  @Output() removeUser = new EventEmitter();

  readonly displayedColumns = ['email', 'displayName', 'actions'];

  constructor() {}

  handleEdit(user: UserInterface): void {
    this.editUser.emit(user);
  }

  handleRemove(user: UserInterface): void {
    this.removeUser.emit(user);
  }
}
