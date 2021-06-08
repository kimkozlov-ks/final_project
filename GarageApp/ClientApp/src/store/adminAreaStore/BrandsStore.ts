import {Action, Reducer} from "redux";
import {AppThunkAction} from "../index";
import * as HttpClient from "../../services/HttpClient"
import * as config from "../../config/urls"

export interface Brand{
    id: number
    name: string;
    models: Model[];
}

export interface Model{
    id: number;
    name: string;
    brandId: number
}

export interface BrandsState{
    brands: Brand[],
    errorMessage: string
}

export interface GetBrandsAction { type: 'GET_BRANDS', brands: Brand[]}
export interface GetModelsAction { type: 'GET_MODELS', models: Model[], brandId: number}
export interface AddBrandAction { type: 'ADD_BRAND', brand: Brand}
export interface AddModelAction { type: 'ADD_MODEL', model: Model, brandId: number}
export interface EditBrandAction { type: 'EDIT_BRAND', brand: Brand}
export interface EditModelAction { type: 'EDIT_MODEL', model: Model}
export interface FailAction { type: 'FAIL', error: string}

export type KnownAction = GetBrandsAction | GetModelsAction | EditBrandAction | EditModelAction | FailAction | AddBrandAction | AddModelAction;

const emptyState: BrandsState = {
    brands: new Array<Brand>(),
    errorMessage: ''
};

export const actionCreators = {
    getBrands: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        if(getState().brands.brands.length) return;

        const result = await HttpClient.get(config.BRANDS_BASE_URL);
        let brands: Brand[] = result.body;

        return result.success
            ? dispatch({type: 'GET_BRANDS', brands: brands} as GetBrandsAction)
            : dispatch({type: 'FAIL', error: 'Types are not loaded'} as FailAction);
    },

    addBrand: (brandName: string): AppThunkAction<KnownAction> => async (dispatch) => {
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const body = {
            name: brandName
        };

        const result = await HttpClient.post(
            config.BRANDS_BASE_URL + 'add',
            JSON.stringify(body),
            headers );

        return result.success
            ? dispatch({type: 'ADD_BRAND', brand: result.body} as AddBrandAction)
            : dispatch({type: 'FAIL', error: 'Type is not added'} as FailAction);

    },

    getModels: (brandId: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        //if(getState().adminArea.vehicleType.length) return;

        const result = await HttpClient.get(config.MODELS_BASE_URL + `${brandId}`);
        let models: Model[] = result.body;

        return result.success
            ? dispatch({type: 'GET_MODELS', models: models, brandId: brandId} as GetModelsAction)
            : dispatch({type: 'FAIL', error: 'Subtypes are not loaded'} as FailAction);
    },
    addModel: (brandId: number, name: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const body = {
            name: name,
            transportBrandId: brandId
        };

        const result = await HttpClient.post(
            config.MODELS_BASE_URL + 'add',
            JSON.stringify(body, (key, value)=>{
                if(key == 'transportBrandId')
                {
                    value = parseInt(value);
                }

                return value;
            }),
            headers );
        
        return result.success
            ? dispatch({type: 'ADD_MODEL', model: result.body, brandId: brandId} as AddModelAction)
            : dispatch({type: 'FAIL', error: 'Subtype is not added'} as FailAction);
    },
    editModel: (model: Model) : AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const result = await HttpClient.put(
            config.MODELS_BASE_URL + `edit`,
            JSON.stringify(model, (key, value)=>{
                if(key == 'id')
                {
                    value = parseInt(value);
                }

                return value;
            }),
            headers );

        return result.success
            ? dispatch({type: 'EDIT_MODEL', model: model} as EditModelAction)
            : dispatch({type: 'FAIL', error: 'Subtype is not edited'} as FailAction);
    }
};

export const reducer: Reducer<BrandsState> = (state: BrandsState = emptyState, incomingAction: Action): BrandsState => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'GET_BRANDS':
            if(state.brands.length) return state;
            
            return {
                ...state,
                brands: [...state.brands, ...action.brands],
            };
        case 'ADD_BRAND':
            return {
                ...state,
                brands: [...state.brands, action.brand],
            };
        case 'GET_MODELS':
            return {
                ...state,
                brands: state.brands.map(
                    (brand) => brand.id === action.brandId ? {...brand, models: action.models}
                        : brand)
            };
        case 'ADD_MODEL':
            console.log(state);
            console.log(action);
            return {
                ...state,
                brands: state.brands.map(
                    (brand) => brand.id === action.brandId ? {...brand, models: [...brand.models, action.model]}
                        : brand)
            }
        case 'EDIT_MODEL':

            const newState: BrandsState = {
                ...state,
                brands: state.brands.map(
                    (brand) => brand.id === action.model.brandId  ? {...brand, subTypes: [...brand.models]} : brand)
            }

            const vehicleType = newState.brands.find((type) => type.id == action.model.brandId);
            let subType = vehicleType!.models.find((model) => model.id === action.model.id);
            subType!.name = action.model.name;

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