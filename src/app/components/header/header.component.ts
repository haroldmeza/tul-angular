import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import firebase from "firebase/app";
import "firebase/auth";
import { Observable } from 'rxjs';
import { orderMessage } from 'src/app/shared/const';
import {  CreatingCart, UserLogin, UserLogout } from 'src/app/store/actions/auth.actions';
import { IsLoading } from 'src/app/store/actions/loading.action';
import { AppState } from 'src/app/store/reducers/initial-state';
import { getTotalProductsInCart } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : String = "";
  quantityProductsInCart : Observable<Number>

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user.uid : "";
      if(this.user){
        this.store.dispatch(UserLogin({ username: this.user}));
        this.store.dispatch(IsLoading({ message: orderMessage.CREATING_CART}));
        this.store.dispatch(CreatingCart({ userId : this.user }));
      }
    })
    this.quantityProductsInCart = this.store.pipe(select(getTotalProductsInCart));
  }

  iniciarSesion(){
    this.router.navigate(['login']);
  }
  
  cerrarSesion(){
    firebase.auth().signOut().then(() => {
      this.store.dispatch(UserLogout());
    }).catch((error) => {})
  }

  goHome(): void{
    this.router.navigate(['']);
  }
}

