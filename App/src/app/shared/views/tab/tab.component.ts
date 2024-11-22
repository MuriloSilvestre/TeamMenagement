import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  imports: [CommonModule],
})
export class TabComponent {
  @Input() title!: string;
  active: boolean = false;
}
