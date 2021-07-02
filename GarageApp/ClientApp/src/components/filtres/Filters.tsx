import React, {useState} from 'react'
import {Button, Form, FormGroup, FormText, Input, Label, Modal} from "reactstrap";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {filteredHomePageUrl, homePageUrl} from "../home/constants";

type ReduxProps = {
    types: TypesStore.TypesState
    brands: BrandsStore.BrandsState
}

type ParentProps = {
    setFilter: (queryParams: string) => void
}

const Filters: React.FC<ReduxProps & ParentProps> = ({
   brands,
   types,
    setFilter
}) => {
    
    const [typeChecked, setTypeChecked] = useState(false)
    const [subTypeChecked, setSubTypeChecked] = useState(false)
    const [brandChecked, setBrandChecked] = useState(false)
    const [modelChecked, setModelChecked] = useState(false)

    const [selectedVehicleType, setSelectedVehicleType] = useState<TypesStore.Type | null>(null);
    const [selectedSubVehicleType, setSelectedSubVehicleType] = useState<TypesStore.SubType | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<BrandsStore.Brand | null>(null);
    const [selectedModel, setSelectedSubBrand] = useState<BrandsStore.Model | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        if( !selectedVehicleType && !selectedSubVehicleType &&
            !selectedBrand && !selectedModel &&
            !typeChecked && !modelChecked && !subTypeChecked && !brandChecked) return;

        let url = filteredHomePageUrl;
        if(typeChecked && selectedVehicleType){
            url += 'typeid=' + selectedVehicleType.id + '&';
        }
        if(subTypeChecked && selectedSubVehicleType){
            url += 'subtypeid=' + selectedSubVehicleType.id + '&';
        }
        if(brandChecked && selectedBrand){
            url += 'brandid=' + selectedBrand.id + '&';
        }
        if(modelChecked && selectedModel){
            url += 'modelid=' + selectedModel.id + '&';
        }

        setFilter(url)
    }
    
    function handleBrandSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedBrand = brands.brands.find(brand => brand.id.toString() === event.target.value)
        if(selectedBrand !== undefined) {
            setSelectedBrand(selectedBrand)
        }
    }

    function handleTypeSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedType = types.vehicleType.find(type => type.id.toString() === event.target.value)
        if(selectedType !== undefined) {
            setSelectedVehicleType(selectedType)
        }
    }
    
    function handleSubTypeSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedSubType = selectedVehicleType!.subTypes.find(subtype => subtype.id.toString() === event.target.value)

        if(selectedSubType !== undefined) {
            setSelectedSubVehicleType(prevState => selectedSubType)
        }
    }

    function handleModelSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedModel = selectedBrand!.models.find(model => model.id.toString() === event.target.value)

        if(selectedModel !== undefined) {
            setSelectedSubBrand(selectedModel)
        }
    }

    return (
        <div style={{position: 'absolute', left: '5px', top: '20%', width: 300, border: 'grey 1px solid', padding: '5px', background: 'white'}}>
            <Form onSubmit={handleSubmit}>
                {/*<FormGroup>*/}
                {/*    <Label for="vehicleName">Nickname</Label>*/}
                {/*    <Input type="text" name="text" id="vehicleName" onChange={handleNickNameInput} value={nickname}/>*/}
                {/*</FormGroup>*/}
                <FormGroup check>
                    <Label check for="type"><Input type="checkbox" onChange={() => setTypeChecked(!typeChecked)}/>{' '}Type</Label>
                    
                    <Input type="select" name="select" id="type" onChange={handleTypeSelect} >
                        <option value="" hidden></option>
                        {types.vehicleType.map(type => (
                            <option
                                id={type.id.toString()}
                                value={type.id}
                                selected={selectedVehicleType ? selectedVehicleType.id == type.id : false }
                            >
                                {type.name}
                            </option>))}
                    </Input>
                </FormGroup>
                <FormGroup check>
                <Label check for="subtype"><Input type="checkbox" onChange={() => setSubTypeChecked(!subTypeChecked)}/>{' '}checkSubType</Label>
                <Input type="select" name="select" id="subtype" onChange={handleSubTypeSelect}>
                    <option value="" hidden></option>
                    {
                        types.vehicleType.map(type => {
                            if(selectedVehicleType && type.id === selectedVehicleType.id){
                                return type.subTypes.map(subType => (
                                    <option
                                        id={subType.id.toString()}
                                        value={subType.id}
                                        selected={selectedSubVehicleType ? selectedSubVehicleType.id == subType.id : false }
                                    >
                                        {subType.name}
                                    </option>));
                            }
                        })
                    }
                </Input>
            </FormGroup>
            <FormGroup check>
                <Label check for="brand"><Input type="checkbox" onChange={() => setBrandChecked(!brandChecked)}/>{' '}Brand</Label>
                <Input type="select" name="select" id="brand" onChange={handleBrandSelect}>
                    <option value="" hidden></option>
                    {brands.brands.map(brand => (
                        <option
                            id={brand.id.toString()}
                            value={brand.id}
                            selected={selectedBrand ? selectedBrand.id == brand.id : false }
                        >
                            {brand.name}
                        </option>))}
                </Input>
            </FormGroup>
            <FormGroup check>
                <Label for="model"><Input type="checkbox" onChange={() => setModelChecked(!modelChecked)}/>{' '}SubBrand</Label>
                <Input type="select" name="select" id="model" onChange={handleModelSelect}>
                    <option value="" hidden></option>
                    {
                        brands.brands.map(brand => {
                            if(selectedBrand && brand.id === selectedBrand.id){
                                return brand.models.map(model => (
                                    <option
                                        id={model.id.toString()}
                                        value={model.id}
                                        selected={selectedModel ? selectedModel.id == model.id : false }
                                    >
                                        {model.name}
                                    </option>));
                            }
                        })
                    }
                </Input>
            </FormGroup>
            <Button style={{margin: '10px 10px 10px 10px'}}>Filter</Button>
            <Button style={{margin: '10px 10px 10px 10px'}} onClick={() => setFilter(homePageUrl)}>Cancel</Button>
            </Form>
        </div>
    )
}

const withConnect = connect(
    (state: ApplicationState) => {
        return {
            types: state.types,
            brands: state.brands
        };
    }
)(Filters)

export default withConnect;