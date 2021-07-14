import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, switchMap} from "rxjs/operators";
import { FirestoreService } from "src/app/services/firestore.service";
import { 
    UserActionTypes, 
    ProductsLoadingSuccess, 
    ProductsLoadingFailure, 
    CreateCartSuccess, 
    UpdatingBackCartTwo, 
    CreatingOrderSuccess, 
    CreatingCart 
} from "../actions/auth.actions";
import { NotLoading } from "../actions/loading.action";
import { product } from "../reducers/initial-state";

@Injectable()
export class UserEffects{

    constructor(
        private actions$: Actions,
        private fireStoreService: FirestoreService,
    ){}

    getProductsEffect$ = createEffect((): any => 
        this.actions$.pipe(
            ofType(UserActionTypes.PRODUCTS_LOADING),
            mergeMap(
                () => this.fireStoreService.getProducts().
                pipe(
                    switchMap((data : any[]) => [
                        ProductsLoadingSuccess({
                            products : data.map(res => {
                                const productData : product = { 
                                    ...(res.payload.doc.data() as product),
                                    id : res.payload.doc.id
                                };
                                return productData;
                            })
                        }),
                        NotLoading()
                    ]),
                    catchError((error) : any => ProductsLoadingFailure()),
                )
            )
        )
    );

    createCartEffect$ = createEffect((): any => 
        this.actions$.pipe(
            ofType(UserActionTypes.CREATING_CART),
            switchMap(
                ({ userId }) => this.fireStoreService.creatingCart({ userId }).
                pipe(                    
                    switchMap((data : any) =>[
                        CreateCartSuccess({ ...data })
                    ]),
                    catchError(() :any => NotLoading())
                )
            )
        )
    );

    updateCartBackEffect$ = createEffect((): any => 
        this.actions$.pipe(
            ofType(UserActionTypes.UPDATING_BACK_CART),
            mergeMap(
                ({ cartId, productsCart  }) => this.fireStoreService.deleteProductBackCart({ cartId, productsCart }).
                pipe(    
                    switchMap(() => [
                        UpdatingBackCartTwo({ cartId, productsCart }),
                        NotLoading()
                    ]),
                    catchError(() :any => NotLoading())
                )
            )
        )
    );


    UpdatingBackCartTwo = createEffect((): any => 
        this.actions$.pipe(
            ofType(UserActionTypes.UPDATING_BACK_CART_TWO),
            mergeMap(
                ({ cartId, productsCart  }) => this.fireStoreService.updatingCartInBack({ cartId, productsCart }).
                pipe(    
                    map(() => NotLoading())
                )
            )
        )
    );

    CreatingOrder = createEffect(() : any =>
        this.actions$.pipe(
            ofType(UserActionTypes.CREATING_ORDER),
            switchMap(
            ({ cartId, userId }) => this.fireStoreService.createOrder({ cartId }).
                pipe(
                    switchMap(() => [
                        CreatingOrderSuccess(),
                        NotLoading(),
                        CreatingCart({ userId })
                    ]),
                    catchError(async () => NotLoading())
                )
            )

        )
    );
}