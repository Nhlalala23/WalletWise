import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private auth: AuthService) { }

  private router = inject(Router);

  errorMessage = '';
  hidePassword = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.email]),

    password: new FormControl('', [Validators.required,
    Validators.minLength(8)])
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;

      //console.log('Login form is valid');
    }

    const {email,password} = this .loginForm.getRawValue();

    if (!email || !password) {
      return;
    }
    try{
      await this.auth.login(email,password);
      this.errorMessage='';
    await this.router.navigate(['/dashboard']);
    } catch(error:unknown){
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
      
  }

  // async onSubmit(){
  //   if(this.loginForm.invalid) return;
  //   const {email,password} = this.loginForm.value;

  //   try {
  //     await this.authService.login(email!,password!);
  //     this.router.navigate(['/dashboard']);
  //   } catch (error:any){
  //     this.errorMessage =error.message;
  //   }

  // }
  // private getFriendlyError(code:string ):string{
  //   switch(code){
  //     case 'auth/invalid-credetial':
  //       case 'auth/wrong-password':
  //         case'auth/user-not-found':
  //         return 'Incorrect email or password.';
  //         case 'auth/too-many-requests':
  //         return 'Too many login attempts. Please try again later.';
  //         default:
  //           return 'Something went wrong. Please try again later.'
  //   }
  // }

}
