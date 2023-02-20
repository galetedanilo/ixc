import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { StorageService } from 'src/app/core/storege/storage.service';

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

  readonly displayedColumns = ['email', 'userName', 'isAdmin', 'actions'];

  constructor(@SkipSelf() private storageService: StorageService) {}

  handleEdit(data: UserInterface): void {
    this.edit.emit(data);
  }

  handleRemove(data: UserInterface): void {
    this.remove.emit(data);
  }

  checkIfIsMyUser(userId: number) {
    const user = this.storageService.getUser();
    console.log(user);
    return user.user.id === userId;
  }
}
