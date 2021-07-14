import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { User } from '../store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  autenticateUser(user: User){
    let { email, password } = user;
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
