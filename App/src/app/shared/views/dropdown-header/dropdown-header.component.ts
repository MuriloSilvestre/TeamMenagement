import { CommonModule } from '@angular/common';
import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown-header',
  standalone: true,
  templateUrl: './dropdown-header.component.html',
  styleUrls: ['./dropdown-header.component.css'],
  imports: [CommonModule],
})
export class DropdownHeaderComponent {
  isOpen = false;
  @Input() title = '';
  @Input() icon = '';

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  handleOutsideClick(target: EventTarget) {
    const clickedInside = (target as HTMLElement).closest('.dropdown-header');
    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
