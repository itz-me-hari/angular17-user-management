import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { UsersComponent } from './users/users.component';
export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', component: UsersComponent }
];
