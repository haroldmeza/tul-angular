import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { AppState } from "./initial-state";
import { loadingReducer } from "./loading.reducer";
import { userReducer } from "./user.reducer";

export const reducers: ActionReducerMap<AppState> = {
    userState: userReducer,
    loadingState : loadingReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
      console.log('state', state);
      console.log('action', action);
      return reducer(state, action);
    };
  }
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : [];