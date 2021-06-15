import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";

export type VehicleState = {
    activeVehicleId: string
}

export interface SetActiveVehicleId { type: 'SET_ACTIVE_VEHICLE_ID', id: string}


export type KnownAction = SetActiveVehicleId

const emptyState: VehicleState = {
    activeVehicleId: ''
};

export const actionCreators = {
    setActiveVehicleId: (id: string) : AppThunkAction<KnownAction> => async (dispatch) => {
        dispatch({type: "SET_ACTIVE_VEHICLE_ID", id: id})
    }
};

export const reducer: Reducer<VehicleState> = (state: VehicleState = emptyState, incomingAction: Action): VehicleState => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'SET_ACTIVE_VEHICLE_ID':
            return {
                ...state,
                activeVehicleId: action.id
            }
        default:
            return state;
    }
};