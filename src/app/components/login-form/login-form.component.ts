import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from "firebase/app";
import "firebase/auth";
import { messages } from 'src/app/shared/const';
import { AppState } from 'src/app/store/reducers/initial-state';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  validateForm!: FormGroup;
  error: String = "";
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  registrar(): void{
    this.router.navigate(['register']);
  }

  submitForm(): void {
    this.error = '';
    if(this.validateForm.valid){
      const { email, password } = this.validateForm.value
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          let user = userCredential.user;
          this.verificarEmail(user);
        })
        .catch((error) => {
          this.error = error.message;
        })
    }
  }

  verificarEmail(user: any): void{
    if(user.emailVerified){
      this.router.navigate(['']);
    }else{
      this.error = messages.EMAIL_HAS_NOT_VERIFIED;
    }
  }
}
