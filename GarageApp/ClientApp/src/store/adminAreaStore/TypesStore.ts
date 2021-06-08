import {Action, Reducer} from "redux";
import {AppThunkAction} from "../index";
import * as HttpClient from "../../services/HttpClient"
import * as config from "../../config/urls"
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

export interface TypesState{
    vehicleType: Type[],
    errorMessage: string
}

export interface GetVehicleTypesAction { type: 'GET_TYPES', types: Type[]}
export interface GetVehicleSubTypesAction { type: 'GET_SUB_TYPES', subtypes: SubType[], vehicleTypeId: number}
export interface GetVehicleBrandsAction { type: 'GET_BRANDES'}
export interface GetVehicleModelAction { type: 'GET_MODEL'}
export interface AddTypeAction { type: 'ADD_TYPE', vehicleType: Type, typeId: number}
export interface AddSubTypeAction { type: 'ADD_SUB_TYPE', subtype: SubType, typeId: number}
export interface EditSubTypeAction { type: 'EDIT_SUB_TYPE', subtype: SubType}
export interface FailAction { type: 'FAIL', error: string}

export type KnownAction = GetVehicleTypesAction | GetVehicleSubTypesAction | GetVehicleBrandsAction | GetVehicleModelAction | FailAction | AddSubTypeAction | EditSubTypeAction | AddTypeAction;


const emptyState: TypesState = {
    vehicleType: new Array<Type>(),
    errorMessage: ''
};

export const actionCreators = {
    getTypes: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        if(getState().types.vehicleType.length) return;

        const result = await HttpClient.get(config.TYPES_BASE_URL);
        let types: Type[] = result.body;

        return result.success
            ? dispatch({type: 'GET_TYPES', types: types} as GetVehicleTypesAction)
            : dispatch({type: 'FAIL', error: 'Types are not loaded'} as FailAction);
    },

    addType: (typeName: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const body = {
            name: typeName
        };

        const result = await HttpClient.post(
            config.TYPES_BASE_URL + `add`,
            JSON.stringify(body),
            headers );

        return result.success
            ? dispatch({type: 'ADD_TYPE', vehicleType: result.body} as AddTypeAction)
            : dispatch({type: 'FAIL', error: 'Type is not added'} as FailAction);

    },

    getSubType: (vehicleTypeId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        //if(getState().adminArea.vehicleType.length) return;

        const result = await HttpClient.get(config.TYPES_BASE_URL + `${vehicleTypeId}`);
        let subtypes: SubType[] = result.body;

        return result.success
            ? dispatch({type: 'GET_SUB_TYPES', subtypes: subtypes, vehicleTypeId: vehicleTypeId} as GetVehicleSubTypesAction)
            : dispatch({type: 'FAIL', error: 'Subtypes are not loaded'} as FailAction);
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
            ? dispatch({type: 'ADD_SUB_TYPE', subtype: result.body, typeId: vehicleTypeId} as AddSubTypeAction)
            : dispatch({type: 'FAIL', error: 'Subtype is not added'} as FailAction);
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
            : dispatch({type: 'FAIL', error: 'Subtype is not edited'} as FailAction);
    }
};

export const reducer: Reducer<TypesState> = (state: TypesState = emptyState, incomingAction: Action): TypesState => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'GET_TYPES':
            if(state.vehicleType.length) return state;
            
            return {
                ...state,
                vehicleType: [...state.vehicleType, ...action.types],
            };
        case 'ADD_TYPE':
            return {
                ...state,
                vehicleType: [...state.vehicleType, action.vehicleType],
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

            const newState: TypesState = {
                ...state,
                vehicleType: state.vehicleType.map(
                    (type) => type.id === action.subtype.transportId  ? {...type, subTypes: [...type.subTypes]} : type)
            }

            const vehicleType = newState.vehicleType.find((type) => type.id == action.subtype.transportId);
            let subType = vehicleType!.subTypes.find((subtype) => subtype.id === action.subtype.id);
            subType!.name = action.subtype.name;

            return newState;

        case 'FAIL':
            return {
                ...state,
                errorMessage: action.error
            }

        default:
            return state;
    }
};