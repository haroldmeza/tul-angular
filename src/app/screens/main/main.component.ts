import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddProductToCart, UpdatingBackCart } from 'src/app/store/actions/auth.actions';
import { AppState, product, productCarts } from 'src/app/store/reducers/initial-state';
import { getCartId, getProducts, getProductsIdInCart } from 'src/app/store/selectors/user.selector';
import firebase from "firebase/app";
import "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products : Observable<product[]>
  user : String = "";
  cartId : String = ""
  productCarts : productCarts [] = []

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.products = this.store.pipe(select(getProducts))
    this.store.pipe(select(getCartId)).subscribe(val => this.cartId = val)
    this.store.pipe(select(getProductsIdInCart)).subscribe(val => this.productCarts = val)
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user.uid : "";
    })
  }

  async addProduct(product : product){ 
    if(!this.user){
      this.router.navigate(['login']);
    }else{
      this.store.dispatch(AddProductToCart({ product, cartId : this.cartId }));
      this.store.dispatch(UpdatingBackCart({ cartId : this.cartId, productsCart : this.productCarts }));
    }
  }
}
