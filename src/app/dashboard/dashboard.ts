import { Component,inject } from '@angular/core';
import { AuthService } from '../services/auth.services';
import {Router} from '@angular/router';
import{MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService =inject(AuthService);
  private router = inject(Router);

  async logout():Promise<void>{
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
        }catch (error){
          console.error('Logout failed:',error);
        }
  }
}
