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
    
    function handleSubmit(event: any){
        event.preventDefault()
        console.log(event)
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

    function handleTypeSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedType = props.types.vehicleType.find(type => type.id.toString() === event.target.value)
        if(selectedType !== undefined) {
            setSelectedVehicleType(selectedType)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="vehicleName">Nickname</Label>
                <Input type="text" name="text" id="vehicleName"/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Type</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={handleTypeSelect}>
                    {props.types.vehicleType.map(type => (<option id={type.id.toString()} value={type.id}>{type.name}</option>))}
                </Input>
                <Label for="exampleSelect">SubType</Label>
                <Input type="select" name="select" id="exampleSelect">
                    {
                        props.types.vehicleType.map(type => {
                            if(selectedVehicleType && type.id === selectedVehicleType.id){
                                return type.subTypes.map(subType => (
                                    <option id={subType.id.toString()}>{subType.name}</option>));
                            }
                        })
                    }
                </Input>
            </FormGroup>
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
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" accept="image/png, image/png, image/jpeg"/>
                <FormText color="muted">
                    Select a photo
                </FormText>
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