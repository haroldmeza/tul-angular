import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import firebase from "firebase/app";
import { alertType, messages } from 'src/app/shared/const';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  showModal : boolean = false;
  validateForm!: FormGroup;
  alertMessage: String = "";
  alertType : String = alertType.TYPE_ERROR
  alertTitle : String = messages.ERROR
  showPassword : boolean = false;
  
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      agree: [false]
    });
  }

  getAcceptAgreement(element: string): boolean{
    let isAgree: boolean = this.validateForm.get(element)?.value ?? false;
    return isAgree;
  }

  submitForm(): void {
    this.alertMessage = '';
    const { email, password } = this.validateForm.value
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user } : any)=> {
        user.sendEmailVerification().then(() => { 
          this.showEmailVerificationSent();
        }).catch((error) => {
          this.alertMessage = error.message;
        })
        
      }).catch((error) => {
        this.alertMessage = error.message;
      })
  }

  showEmailVerificationSent(): void {
    this.alertType = alertType.TYPE_SUCCESS;
    this.alertTitle = messages.EMAIL_SENT
    this.alertMessage = messages.EMAIL_VERIFIY_SENT
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  }

  togglePassword(event: any): void{
    this.showPassword = !this.showPassword;
    event.preventDefault();
    if (event.defaultPrevented) return;
  }
}
