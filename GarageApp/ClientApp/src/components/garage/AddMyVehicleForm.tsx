import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import Select from 'react-select'

interface BrandsProps 
{
    types: TypesStore.TypesState, 
    brands: BrandsStore.BrandsState,
    getTypes: () => void,
    getBrands: () => void
}


const AddMyVehicleForm = (props: BrandsProps) => {
    
    const [vehicleType, setVehicleType] = useState(props.types.vehicleType[0]);
    
    function handleSubmit(){
        
    }

    function handleChange(event: React.FormEvent<HTMLSelectElement>){
        event.preventDefault();
      //  setVehicleType(props.types.vehicleType[Number()]);
        console.log(event.currentTarget.value);
    }
    
    function renderSelect(array: any){
        return array.map((el: any) =>
            <option value={el.id}>{el.name}</option>);
    }

    useEffect(() =>{
        props.getTypes();
        props.getBrands();
    })
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Vehicle Type
                    <select value={1} onChange={handleChange}>
                        {
                           renderSelect(props.types.vehicleType)
                        };
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Vehicle Brand
                    <select value={0} onChange={handleChange}>
                        {
                            renderSelect(props.brands.brands)
                        };
                    </select>
                </label>
            </div>
            <div> 
                <label>
                    Info
                    <input type="text"/>
                </label>
            </div>
            <div>
                <label>
                    Add photo
                <input type="file"/> 
                </label>   
            </div>
            <div>
                <input type="submit" value="Add" accept=".jpg, .jpeg, .png"/> 
            </div>
        </form>
    )
}


let withConnect = connect(
    (state: ApplicationState) => {
        return {
            types: state.types,
            brands: state.brands
        };
    },
    {
        getBrands: BrandsStore.actionCreators.getBrands,
        getTypes: TypesStore.actionCreators.getTypes
    }
    
)(AddMyVehicleForm as any)

export default withConnect;