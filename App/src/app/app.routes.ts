import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/views/layout/layout.component';
import { AuthComponent } from './auth/views/auth.component';
import { HomeComponent } from './home/views/home.component';
import { TaskComponent } from './task/views/task.component';
import { ProfileComponent } from './profile/views/profile.component';
import { UserComponent } from './user/views/user.component';
import { AuthGuard } from './helpers/authentication.selectors';
import { ProjectComponent } from './project/views/project.component';
import { TeamComponent } from './team/views/team.component';
import { ConfigurationComponent } from './configuration/views/configuration.component';
import { ChatComponent } from './chat/views/chat.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente', 'Auditor', 'Usuário'],
        },
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente', 'Auditor', 'Usuário'],
        },
      },
      {
        path: 'project',
        component: ProjectComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente', 'Auditor', 'Usuário'],
        },
      },
      {
        path: 'task/:id/:tipo',
        component: TaskComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente', 'Auditor', 'Usuário'],
        },
      },
      {
        path: 'team',
        component: TeamComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente'],
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente'],
        },
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente'],
        },
      },
      {
        path: 'config',
        component: ConfigurationComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['Administrador', 'Gerente'],
        },
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];
