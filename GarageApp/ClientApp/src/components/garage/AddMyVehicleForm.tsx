import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";

type AddMyVehicleFormProps =
{
    types: TypesStore.TypesState
    brands: BrandsStore.BrandsState
    getTypes: () => void
    getBrands: () => void
    getModels: (brandId: number) => void
    getSubTypes: (typeId: number) => void
}


const AddMyVehicleForm = (props: AddMyVehicleFormProps) => {
  
    const [selectedVehicleType, setSelectedVehicleType] = useState(props.types.vehicleType[0]);
    const [selectedSubVehicleType, setSelectedSubVehicleType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(props.brands.brands[0]);
    const [selectedSubBrand, setSelectedSubBrand] = useState(null);
    
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

    function handleBrandSelect(event: React.ChangeEvent<HTMLInputElement>) {
       const selectedBrand = props.brands.brands.find(brand => brand.id.toString() === event.target.value)
        if(selectedBrand !== undefined) {
            setSelectedBrand(selectedBrand)
        }
    }

    return (
        <Form>
            {/*<FormGroup>*/}
            {/*    <Label for="vehicleName">Name</Label>*/}
            {/*    <Input type="password" name="password" id="vehicleName" placeholder="password placeholder" />*/}
            {/*</FormGroup>*/}
            <FormGroup>
                <Label for="exampleSelect">Brand</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={handleBrandSelect}>
                    {props.brands.brands.map(brand => (<option id={brand.id.toString()} value={brand.id}>{brand.name}</option>))}
                </Input>
                <Label for="exampleSelect">SubBrand</Label>
                <Input type="select" name="select" id="exampleSelect">
                    {
                            props.brands.brands.map(brand => {
                                if(selectedBrand && brand.id === selectedBrand.id){
                                    return brand.models.map(model => (
                                        <option id={model.id.toString()}>{model.name}</option>));
                            }
                        })
                    }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
            <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Option one is this and that—be sure to include why it's great
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Option two can be something else and selecting it will deselect option one
                    </Label>
                </FormGroup>
                <FormGroup check disabled>
                    <Label check>
                        <Input type="radio" name="radio1" disabled />{' '}
                        Option three is disabled
                    </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Check me out
                </Label>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
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
        geModels: BrandsStore.actionCreators.getModels,
        getTypes: TypesStore.actionCreators.getTypes,
        getSubTypes: TypesStore.actionCreators.getSubType
    }
    
)(AddMyVehicleForm as any)

export default withConnect;