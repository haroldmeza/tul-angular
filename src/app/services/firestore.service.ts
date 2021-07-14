import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { productCarts } from '../store/reducers/initial-state';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { errors, orderStatus } from '../shared/const';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getProducts(){
    return this.firestore.collection('product').snapshotChanges();
  }

  deleteProductBackCart({ cartId, productsCart }){
    return from( new Promise((resolve, reject) => {
      this.firestore.collection('product_carts', ref => ref.where('cart_id', '==', cartId)).get().subscribe(
        querySnapShot => {
          querySnapShot.forEach((doc) => {
            doc.ref.delete();
          });
          resolve({cartId, productsCart});
        },
        err => reject(err)
      )
    }));
  }

  updatingCartInBack( {cartId, productsCart} ){
    const db = firebase.firestore();
    const batch = db.batch();
    return from( new Promise((resolve, reject) => {
      (productsCart as productCarts[]).forEach((product) => {
        const docRef = db.collection('product_carts').doc();
        batch.set(docRef, product)
      });
      batch.commit().then(() => resolve({})).catch(err => reject(err));
    }));
    
  }

  creatingCart( {userId} ){
    return from( new Promise(async (resolve, reject) =>{
      let cartBack = await this.firestore.collection('carts', 
        ref => ref.where('userId', '==', userId).where('status', '==', orderStatus.PENDING)
      ).get().pipe(first()).toPromise();
      if(cartBack.empty){
        const newCart : any = {
          status : orderStatus.PENDING,
          userId : userId
        }
        try{
          let res = await this.createCartId(newCart);
          resolve({
            cartId : res.id,
            productsCarts : []
          });
        }catch(err){
          reject(errors.CART_NOT_CREATED);
        }
      }else{
        try{
          const cartId = cartBack.docs[0].id;
          let res = await this.getProductsInCartBack(cartId);
          resolve({
            cartId : cartId,
            productsCarts : res
          });
        }catch(err){
          reject(errors.PRODUCT_INFORMATION_ERROR);
        }
      }
    }));
  }

  createOrder({cartId}){
    return from(this.firestore.collection('carts').doc(cartId).set({status : orderStatus.COMPLETED}, {merge : true}));
  }

  private createCartId(cart){
    return this.firestore.collection('carts').add(cart);
  }

  private getProductsInCartBack(cartId : String){
    return this.firestore.collection('product_carts', ref => ref.where('cart_id', '==', cartId)).valueChanges().pipe(first()).toPromise()
  }

  getOrderById(orderId : String){
    return from( new Promise(async (resolve, reject) =>{
      let products : any[] = [];
      let orderProducts = await this.firestore.collection('product_carts', ref => ref.where('cart_id', '==', orderId)).valueChanges().pipe(first()).toPromise();
      if (orderProducts.length > 0){
        orderProducts.forEach(async (doc: any) =>{
          const { product_id, quantity } = doc;
          try{
            const product = await this.getProductById(product_id);
            products.push({
              quantity,
              product : { ...product.data() }
            }) 
          }catch(err){
            reject(err)
          };
        })
      }
      resolve({
        products
      })
    })) as Observable<any[]>;
  }

  private getProductById(productId : string){
    let db = firebase.firestore();
    return db.collection('product').doc(productId).get();
  }

  deletingCartBack ({ idCart }: any){
    return this.firestore.collection('products_carts', ref => ref.where('idCart', '==', idCart)).doc().delete;
  }
}
