import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import firebase from "firebase/app";
import "firebase/auth";
import { Observable } from 'rxjs';
import { orderMessage } from 'src/app/shared/const';
import { CreatingOrder, DeleteProductFromCart, SubtractProductFromCart, UpdatingBackCart } from 'src/app/store/actions/auth.actions';
import { IsLoading } from 'src/app/store/actions/loading.action';
import { AppState, product, productCarts } from 'src/app/store/reducers/initial-state';
import { getCartId, getOrderId, getProductsIdInCart, getProductsWithQuantity } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products : Observable<any[]>
  user : String = "";
  cartId : String = ""
  productCarts : productCarts [] = []


  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products = this.store.pipe(select(getProductsWithQuantity))
    this.store.pipe(select(getCartId)).subscribe(val => this.cartId = val)
    this.store.pipe(select(getProductsIdInCart)).subscribe(val => this.productCarts = val)
    this.store.pipe(select(getOrderId)).subscribe(val => {
      if(val){
        this.router.navigate(['order-detail', { id: val }])
      }
    })
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user.uid : "";
    })
  }

  substractProduct(product: product){
    this.store.dispatch(SubtractProductFromCart({ product }));
    this.store.dispatch(UpdatingBackCart({ cartId : this.cartId, productsCart : this.productCarts }));
  }

  deleteProduct(product: product){
    this.store.dispatch(DeleteProductFromCart({ product }));
    this.store.dispatch(UpdatingBackCart({ cartId : this.cartId, productsCart : this.productCarts }));
  }

  crearOrden(){
    this.store.dispatch(IsLoading({ message: orderMessage.CREATING_ORDER}));
    this.store.dispatch(CreatingOrder({ userId: this.user, cartId : this.cartId}));
  }
}
