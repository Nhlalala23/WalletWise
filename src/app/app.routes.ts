import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Register } from './register/register';
import { Login } from './login/login';
import{Dashboard} from './dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Landing},
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', 
    component: Dashboard,
    canActivate:[authGuard] }

];
