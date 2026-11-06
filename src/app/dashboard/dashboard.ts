import { Component,inject } from '@angular/core';
import{Auth,authState} from '@angular/fire/auth';
import { AuthService } from '../services/auth.services';
import {Router} from '@angular/router';
import{MatButtonModule} from '@angular/material/button';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, 
    AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService =inject(AuthService);
  private router = inject(Router);
  private auth = inject(Auth);

  //$ is a naming convention used to identify Observable streams in Angular. 
  // It helps developers quickly recognize that the variable represents a stream 
  // of data that can be subscribed to and observed for changes.
  user$ = authState(this.auth);
  
  async logout():Promise<void>{
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
        }catch (error){
          console.error('Logout failed:',error);
        }
  }
}
