import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import * as HttpClient from "../services/HttpClient"
import * as config from "../config/urls"
import {act} from "react-dom/test-utils";

export interface Type{
    id: number
    name: string;
    subTypes: SubType[];
}

export interface SubType{
    id: number;
    name: string;
    transportId: number
}

export interface AdminAreaState{
    vehicleType: Type[]
}

export interface GetVehicleTypesAction { type: 'GET_TYPES', types: Type[]}
export interface GetVehicleSubTypesAction { type: 'GET_SUB_TYPES', subtypes: SubType[], vehicleTypeId: number}
export interface GetVehicleBrandsAction { type: 'GET_BRANDES'}
export interface GetVehicleModelAction { type: 'GET_MODEL'}
export interface AddSubTypeAction { type: 'ADD_SUB_TYPE', subtype: SubType, typeId: number}
export interface EditSubTypeAction { type: 'EDIT_SUB_TYPE', subtype: SubType}
export interface FailAction { type: 'FAIL'}

export type KnownAction = GetVehicleTypesAction | GetVehicleSubTypesAction | GetVehicleBrandsAction | GetVehicleModelAction | FailAction | AddSubTypeAction | EditSubTypeAction;


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

    addType: (typeName: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        console.log('Add type is not implemented');
        // const headers = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // };
        //
        // const body = {
        //     name: name,
        //     transportTypeid: vehicleTypeId
        // };
        //
        // const result = await HttpClient.post(
        //     config.TYPES_BASE_URL + `subtype/add`,
        //     JSON.stringify(body, (key, value)=>{
        //         if(key == 'transportTypeid')
        //         {
        //             value = parseInt(value);
        //         }
        //
        //         return value;
        //     }),
        //     headers );
        //
        // return result.success
        //     ? dispatch({type: 'ADD_TYPE', type: {name}, typeId: vehicleTypeId} as AddTypeAction)
        //     : dispatch({type: 'FAIL'} as FailAction);
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
        
        return result.success
            ? dispatch({type: 'ADD_SUB_TYPE', subtype: {name}, typeId: vehicleTypeId} as AddSubTypeAction)
            : dispatch({type: 'FAIL'} as FailAction);
    },
    editSubType: (subType: SubType) : AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        
        const result = await HttpClient.put(
            config.TYPES_BASE_URL + `subtype/edit`,
            JSON.stringify(subType, (key, value)=>{
                if(key == 'id')
                {
                    value = parseInt(value);
                }

                return value;
            }),
            headers );
        
        return result.success
            ? dispatch({type: 'EDIT_SUB_TYPE', subtype: subType} as EditSubTypeAction)
            : dispatch({type: 'FAIL'} as FailAction);
    }
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
            return {
                ...state,
                vehicleType: state.vehicleType.map(
                    (type) => type.id === action.vehicleTypeId ? {...type, subTypes: action.subtypes}
                        : type)
            };
        case 'ADD_SUB_TYPE':
            return {
                ...state,
                vehicleType: state.vehicleType.map(
                    (type) => type.id === action.typeId ? {...type, subTypes: [...type.subTypes, action.subtype]}
                        : type)
            }
        case 'EDIT_SUB_TYPE':

            const newState: AdminAreaState = {
                ...state,
                vehicleType: state.vehicleType.map(
                    (type) => type.id === action.subtype.transportId  ? {...type, subTypes: [...type.subTypes]} : type)
            }
            
            const vehicleType = newState.vehicleType.find((type) => type.id == action.subtype.transportId);
            let subType = vehicleType!.subTypes.find((subtype) => subtype.id === action.subtype.id);
            subType!.name = action.subtype.name;
            

            return newState;   
        default:
            return state;
    }
};