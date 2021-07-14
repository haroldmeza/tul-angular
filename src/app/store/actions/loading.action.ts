import { createAction, props } from "@ngrx/store"

export enum LoadingActionTypes {
    IS_LOADING = '[LOADING] Esta cargando',
    NOT_LOADING = '[LOADING] No esta cargando'
}
  

export const IsLoading = createAction(
    LoadingActionTypes.IS_LOADING,
    props<{ message: string }>()
)

export const NotLoading = createAction(
    LoadingActionTypes.NOT_LOADING
)