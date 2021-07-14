import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsLoading } from './store/actions/auth.actions';
import { IsLoading } from './store/actions/loading.action';
import { AppState } from './store/reducers/initial-state';
import firebase from "firebase/app";
import "firebase/auth";
import { messages } from './shared/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = messages.APP_NAME;

  constructor(
    private store: Store<AppState>
  ){}
  ngOnDestroy(): void {
    firebase.auth().signOut();
  }


  ngOnInit(): void {
    this.store.dispatch(IsLoading({ message : messages.LOADING_PRODUCTS}))
    this.store.dispatch(ProductsLoading())
  }

}
