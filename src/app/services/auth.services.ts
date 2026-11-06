import{Injectable, inject} from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth); 

   //Register a new user
   //create a firebase account
   register (email:string,password:string){
    return createUserWithEmailAndPassword(
        this.auth,
        email,
        password);
   }

   //sign in an existing user
   //verifies xisting user's account
   login(email:string,password:string){
    return signInWithEmailAndPassword(
        this.auth,
        email,
        password
    );
   }

   logout(){
    return signOut(this.auth);
   }
}