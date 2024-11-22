import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-content',
  standalone: true,
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css'],
})
export class HeaderContentComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
