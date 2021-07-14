import { createReducer, on } from "@ngrx/store";
import { Loadingstate } from "./initial-state";

import * as LoadingActions from "../actions/loading.action";

export const initialState : Loadingstate = {
    loading : false,
    message : ""
}

export const userFeatureKey = 'user';

export const loadingReducer = createReducer(
    initialState,
    on(LoadingActions.IsLoading, 
        (state : Loadingstate, { message }) => {
        return {
            ...state, 
            loading : true,
            message
        }
    }),
    on(LoadingActions.NotLoading,
        (state : Loadingstate) => {
        return {
            ...state,
            loading : false,
            message : ""
        }
    })
)