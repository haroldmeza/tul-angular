import { createAction, props } from '@ngrx/store';
import { product, productCarts } from '../reducers/initial-state';

export enum UserActionTypes {
    USER_LOGIN = '[USUARIO] Iniciar sesion',
    USER_LOGOUT = '[USUARIO] Cerrar sesion',
    PRODUCTS_LOADING = '[PRODUCTS] Cargando productos',
    PRODUCTS_LOADING_SUCCESS = '[PRODUCTS] Cargando productos exito',
    PRODUCTS_LOADING_FAILURE = '[PRODUCTS] Cargando productos error',
    ADD_PRODUCT_TO_CART = '[PRODUCT] Agregar producto al carrito',
    SUBTRACT_PRODUCT_TO_CART = '[PRODUCT] Restar producto del carrito',
    DELETE_PRODUCT_FROM_CART = '[PRODUCT] Eliminar producto del carrito',
    CREATING_CART = '[CART] Creando carro con esta pending',
    CREATED_CART_SUCCESS = '[CART] Carro en estado pending creado correctamente',
    UPDATING_BACK_CART = '[CART] Borrando carro en back',
    UPDATING_BACK_CART_TWO = '[CART] Creando productos en el carro back',
    CREATING_ORDER = '[CART] Creando orden',
    CREATING_ORDER_SUCCESS = '[CART] Crear orden carro pasa de pending a complete',
    RESET_ORDER_ID = '[ORDER] Resetear el id de la ornde creada'
}
  
export const UserLogin = createAction(
    UserActionTypes.USER_LOGIN,
    props<{ username: String }>()
)

export const UserLogout = createAction(
    UserActionTypes.USER_LOGOUT
)

export const ProductsLoading = createAction(
  UserActionTypes.PRODUCTS_LOADING
)

export const ProductsLoadingSuccess = createAction(
  UserActionTypes.PRODUCTS_LOADING_SUCCESS,
  props<{ products: product[] }>()
)

export const ProductsLoadingFailure = createAction(
  UserActionTypes.PRODUCTS_LOADING_FAILURE
)

export const AddProductToCart = createAction(
  UserActionTypes.ADD_PRODUCT_TO_CART,
  props<{ product: product, cartId: String }>()
)

export const SubtractProductFromCart = createAction(
  UserActionTypes.SUBTRACT_PRODUCT_TO_CART,
  props<{ product: product }>()
)

export const DeleteProductFromCart = createAction(
  UserActionTypes.DELETE_PRODUCT_FROM_CART,
  props<{ product: product }>()
)

export const CreatingCart = createAction(
  UserActionTypes.CREATING_CART,
  props<{ userId: String }>()
)

export const CreateCartSuccess = createAction(
  UserActionTypes.CREATED_CART_SUCCESS,
  props<{ cartId: String, productsCarts: productCarts[] }>()
)

export const UpdatingBackCart = createAction(
  UserActionTypes.UPDATING_BACK_CART,
  props<{ cartId: String, productsCart : productCarts[] }>()
)

export const UpdatingBackCartTwo = createAction(
  UserActionTypes.UPDATING_BACK_CART_TWO,
  props<{ cartId: String, productsCart : productCarts[] }>()
)

export const CreatingOrder = createAction(
  UserActionTypes.CREATING_ORDER,
  props<{ cartId: String, userId: String }>()
)

export const CreatingOrderSuccess = createAction(
  UserActionTypes.CREATING_ORDER_SUCCESS,
)

export const ResetOrderId = createAction(
  UserActionTypes.RESET_ORDER_ID,
)