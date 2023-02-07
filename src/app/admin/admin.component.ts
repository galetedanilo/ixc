import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, SideNavComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}
