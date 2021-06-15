import * as AuthStore from '../auth/AuthStore'
import * as AdminAreaStore from '../store/adminAreaStore/AdminAreaStore'
import * as TypesState from "./adminAreaStore/TypesStore";
import * as BrandsState from "./adminAreaStore/BrandsStore";
import * as VehicleState from "./VehicleStore";

// The top-level state object
export interface ApplicationState {
    authStore: AuthStore.AuthState;
    types: TypesState.TypesState;
    brands: BrandsState.BrandsState;
    vehicles: VehicleState.VehicleState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    authStore: AuthStore.reducer,
    types: TypesState.reducer,
    brands: BrandsState.reducer,
    vehicles: VehicleState.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
