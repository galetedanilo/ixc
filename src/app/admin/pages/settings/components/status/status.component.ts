import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusInterface } from '../../interfaces/status.interface';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  @Input() status!: StatusInterface;
}
