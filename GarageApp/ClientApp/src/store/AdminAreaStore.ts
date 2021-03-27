import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import * as HttpClient from "../services/HttpClient"
import * as config from "../config/urls"

export interface Type{
    id: number
    name: string;
    subTypes: SubType[];
}

export interface SubType{
    name: string;
}

export interface AdminAreaState{
    vehicleType: Type[]
}

export interface GetVehicleTypesAction { type: 'GET_TYPES', types: Type[]}
export interface GetVehicleSubTypesAction { type: 'GET_SUB_TYPES', subtypes: SubType[], vehicleTypeId: number}
export interface GetVehicleBrandsAction { type: 'GET_BRANDES'}
export interface GetVehicleModelAction { type: 'GET_MODEL'}
export interface FailAction { type: 'FAIL'}

export type KnownAction = GetVehicleTypesAction | GetVehicleSubTypesAction | GetVehicleBrandsAction | GetVehicleModelAction | FailAction;


const emptyState: AdminAreaState = {
    vehicleType: new Array<Type>()
};



export const actionCreators = {
    getTypes: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        if(getState().adminArea.vehicleType.length) return;
        
        const result = await HttpClient.get(config.TYPES_BASE_URL);
        let types: Type[] = result.body;

        return result.success
            ? dispatch({type: 'GET_TYPES', types: types} as GetVehicleTypesAction)
            : dispatch({type: 'FAIL'} as FailAction);
    },
    
    getSubType: (vehicleTypeId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        //if(getState().adminArea.vehicleType.length) return;

        const result = await HttpClient.get(config.TYPES_BASE_URL + `${vehicleTypeId}`);
        let subtypes: SubType[] = result.body;

        return result.success
            ? dispatch({type: 'GET_SUB_TYPES', subtypes: subtypes, vehicleTypeId: vehicleTypeId} as GetVehicleSubTypesAction)
            : dispatch({type: 'FAIL'} as FailAction);
    },
    addSubtype: (vehicleTypeId: number, name: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        
        const body = {
            name: name,
            transportTypeid: vehicleTypeId
        };
        
        const result = await HttpClient.post(
            config.TYPES_BASE_URL + `subtype/add`, 
            JSON.stringify(body, (key, value)=>{
                if(key == 'transportTypeid')
                {
                    value = parseInt(value);
                }
                
                return value;
            }), 
            headers );
        
        console.log(result);
        let subtypes: SubType[] = result.body;

        return result.success
            ? dispatch({type: 'GET_SUB_TYPES', subtypes: subtypes, vehicleTypeId: vehicleTypeId} as GetVehicleSubTypesAction)
            : dispatch({type: 'FAIL'} as FailAction);
    },
};

export const reducer: Reducer<AdminAreaState> = (state: AdminAreaState = emptyState, incomingAction: Action): AdminAreaState => {
    const action = incomingAction as KnownAction;
    
    switch (action.type) {
        case 'GET_TYPES':
            return {
                ...state,
                vehicleType: [...state.vehicleType, ...action.types],
            };
        case 'GET_SUB_TYPES':
            console.log(action.subtypes);
            return {
                ...state,
                vehicleType:  state.vehicleType.map(
                    (type) => type.id === action.vehicleTypeId ? {...type, subTypes: action.subtypes}
                        : type)
            };
        default:
            return state;
    }
};