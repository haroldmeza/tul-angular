import { createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions/auth.actions";
import { productCarts, UserState } from "./initial-state";

export const initialState: UserState = {
    user : '',
    products : [],
    product_carts: [],
    cart_id: "",
    order_id : ""
}

export const userFeatureKey = 'userState';

export const userReducer = createReducer(
    initialState,
    on(UserActions.UserLogin, 
        (state : UserState, { username }) => {
        return {
            ...state, 
            products: [...state.products], 
            product_carts: [...state.product_carts], 
            user: username
        }
    }),
    on(UserActions.UserLogout, (state : UserState) => {
        return {
            ...state,
            products: [...state.products], 
            product_carts: [],  
            user: null
        }
    }),
    on(UserActions.ProductsLoading, (state : UserState) => {
        return {
            ...state,
            products: [...state.products], 
            product_carts: [...state.product_carts]
        }
    }),
    on(UserActions.ProductsLoadingSuccess, (state : UserState, { products }) => {
        return {
            ...state,
            product_carts: [...state.product_carts],
            products: [...products], 
        }
    }),
    on(UserActions.AddProductToCart, (state: UserState, { product, cartId }) => {
        if(state.product_carts.length == 0 || !state.product_carts.some((p) => p.product_id == product.id)){
            let cartProduct : productCarts = {
                cart_id : cartId,
                product_id : product.id,
                quantity : 1
            }
            return {
                ...state,
                product_carts: [...state.product_carts, cartProduct],
                products: [...state.products], 
            }
        }else{
            return {
                ...state,
                product_carts: [...state.product_carts.reduce((prev, current) => {
                    if(current.product_id === product.id){
                        return [...prev, {...current, quantity : current.quantity + 1 }]
                    }else{
                        return [...prev, { ...current}]
                    }
                }, [])],
                products: [...state.products], 
            }
        }
    }),
    on(UserActions.SubtractProductFromCart, (state: UserState, { product }) => {
        return {
            ...state,
            product_carts: [...state.product_carts.reduce((prev, current) => {
                if(current.product_id === product.id){
                    if(current.quantity - 1 === 0){
                        return [...prev];
                    }else{
                        return [...prev, {...current, quantity : current.quantity - 1 }]
                    }
                }else{
                    return [...prev, { ...current}]
                }
            }, [])],
            products: [...state.products], 
        }
    }),
    on(UserActions.DeleteProductFromCart, (state: UserState, { product }) => {
        return {
            ...state,
            product_carts: [...state.product_carts.reduce((prev, current) => {
                if(current.product_id === product.id){
                    return [...prev]
                }else{
                    return [...prev, { ...current}]
                }
            }, [])],
            products: [...state.products], 
        }
    }),
    on(UserActions.CreateCartSuccess, (state: UserState, { cartId, productsCarts }) => {
        return {
            ...state,
            product_carts: [...productsCarts],
            products: [...state.products], 
            cart_id : cartId
            
        }
    }),
    on(UserActions.CreatingOrderSuccess, (state : UserState) => {
        return {
            ...state,
            products: [...state.products], 
            product_carts: [],  
            order_id : state.cart_id
        }
    }),
    on(UserActions.ResetOrderId, (state : UserState) => {
        return {
            ...state,
            products: [...state.products], 
            product_carts: [...state.product_carts],  
            order_id : ""
        }
    })

)

