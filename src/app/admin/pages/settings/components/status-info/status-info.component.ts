import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatusComponent } from 'src/app/admin/components/status/status.component';

import { StatusInfoInterface } from '../../interfaces/status-info.interface';

@Component({
  selector: 'app-status-info',
  standalone: true,
  imports: [CommonModule, StatusComponent],
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss'],
})
export class StatusInfoComponent {
  @Input() statusData!: StatusInfoInterface;
}
