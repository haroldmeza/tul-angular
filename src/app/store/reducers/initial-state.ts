
/** USER STATE */
export interface product{
    id: String,
    nombre: String,
    sku : String,
    descripcion : String
}

export interface productCarts{
    product_id : String,
    cart_id: String,
    quantity : number
}

export interface UserState{
    user: String,
    products: product[]
    product_carts: productCarts[],
    cart_id : String,
    order_id : String
}

/** LOADING STATE */

export interface Loadingstate {
    loading : boolean,
    message : String
}

/** APP STATE */
export interface AppState {
    userState : UserState
    loadingState : Loadingstate
}