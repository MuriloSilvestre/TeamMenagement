import { CommonModule } from '@angular/common';
import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [CommonModule],
})
export class DropdownComponent {
  isOpen = false;
  @Input() title = '';

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  handleOutsideClick(target: EventTarget) {
    const clickedInside = (target as HTMLElement).closest('.dropdown');
    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
