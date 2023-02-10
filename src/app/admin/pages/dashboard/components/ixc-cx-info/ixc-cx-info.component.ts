import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from 'src/app/admin/components/status/status.component';
import { SystemInfoInterface } from '../../interfaces/system-info.interface';

@Component({
  selector: 'app-ixc-cx-info',
  standalone: true,
  imports: [CommonModule, StatusComponent],
  templateUrl: './ixc-cx-info.component.html',
  styleUrls: ['./ixc-cx-info.component.scss']
})
export class IxcCxInfoComponent {
  @Input() data!: SystemInfoInterface;
  @Input() title!: string;
}
