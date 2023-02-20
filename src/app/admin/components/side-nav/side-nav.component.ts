import { Component, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StorageService } from 'src/app/core/storege/storage.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {

  constructor(@SkipSelf() private storageService: StorageService) {}

  checkIfIsAdmin() {
    const user = this.storageService.getUser();
    return user.user.isAdmin === true;
  }
  
}
