import { Component, inject } from '@angular/core';
import { FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

//custom validator to check password and confirm password are same or not
function passwordMatchValidator(control: AbstractControl) : ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPasswrd = control.get('confirmPassword')?.value;
  if (password !== confirmPasswrd) {
    return { passwordMismatch: true };
  }
  return null;
}
@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage ='';

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl('',[Validators.required])} , 
    {validators: passwordMatchValidator}
  );

  async onSubmit():Promise<void>{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    const {email,password} =this.registerForm.getRawValue();
    if(!email || !password){
      return;
    }

    try{
      await this.authService.register(email,password);

    this.errorMessage='';
    await this.router.navigate(['/dashboard']);

    } catch (error:unknown) {
      const code = 
        typeof error === 'object' && 
        error !== null && 
        'code' in error && 
        typeof error.code === 'string' ? error.code : '';
        this.errorMessage = this.getFriendlyError(code);
      // this.errorMessage = 'Registration failed. Please try again.';
    }
  }

  private getFriendlyError(code:string ):string{
    switch(code){
      case 'auth/invalid-credetial':
        case 'auth/wrong-password':
         case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
          case 'auth/weak-password':
        return 'Password should be at least 8 characters.';
          default:
            return 'Something went wrong. Please try again later.'
    }
  }
}
