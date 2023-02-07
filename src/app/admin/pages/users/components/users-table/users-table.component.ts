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
  @Input() dataTable: UserInterface[] = []
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  readonly displayedColumns = ['email', 'displayName', 'actions'];

  constructor() {}

  handleEdit(data: UserInterface): void {
    this.edit.emit(data);
  }

  handleRemove(data: UserInterface): void {
    this.remove.emit(data);
  }
}
