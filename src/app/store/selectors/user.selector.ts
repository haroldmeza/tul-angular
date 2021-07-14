import { createFeatureSelector, createSelector } from '@ngrx/store';
import { product, productCarts, UserState } from '../reducers/initial-state';
import * as fromUser from '../reducers/user.reducer';

export const getUserState = createFeatureSelector<UserState>(fromUser.userFeatureKey);

export const getUser = createSelector(
  getUserState,
  (state: UserState) => {
    return state.user
  }
);

export const getProducts = createSelector(
  getUserState,
  (state: UserState) => {
    return state.products
  }
)

export const getTotalProductsInCart = createSelector(
  getUserState,
  (state: UserState) => {
    return state.product_carts.map(productInCart => productInCart.quantity).reduce((acumulator, currentValue) => {
      return acumulator + currentValue
    }, 0)
  }
)

export const getProductsIdInCart = createSelector(
  getUserState,
  (state: UserState) => {
    return state.product_carts
  }
)

export const getProductsWithQuantity = createSelector(
  getProducts,
  getProductsIdInCart,
  (products : product[], productsInCart : productCarts[]) =>{
    return productsInCart.map(productCart => {
      let indexProduct = products.map(product => product.id).indexOf(productCart.product_id);
      return {
        product : products.slice(indexProduct, indexProduct + 1)[0],
        quantity : productCart.quantity,
        cart_id : productCart.cart_id
      }
    })
  }
)

export const getOrderId = createSelector(
  getUserState,
  (state: UserState) => {
    return state.order_id
  }
)

export const getCartId = createSelector(
  getUserState,
  (state: UserState) => {
    return state.cart_id
  }
)