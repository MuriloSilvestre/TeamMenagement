import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from '../../shared/views/header-content/header-content.component';
import { RoleComponent } from '../../role/views/role.component';
import { StatusComponent } from '../../status/views/status.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderContentComponent,
    RoleComponent,
    StatusComponent,
  ],
})
export class ConfigurationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
