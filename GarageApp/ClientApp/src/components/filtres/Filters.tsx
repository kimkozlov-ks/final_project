import React, {useState} from 'react'
import {Button, Form, FormGroup, FormText, Input, Label, Modal} from "reactstrap";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";

type ReduxProps = {
    types: TypesStore.TypesState
    brands: BrandsStore.BrandsState
}

const Filters: React.FC<ReduxProps> = ({
   brands,
   types
}) => {

    const [selectedVehicleType, setSelectedVehicleType] = useState<TypesStore.Type | null>(null);
    const [selectedSubVehicleType, setSelectedSubVehicleType] = useState<TypesStore.SubType | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<BrandsStore.Brand | null>(null);
    const [selectedModel, setSelectedSubBrand] = useState<BrandsStore.Model | null>(null);

    function handleSubmit() {
        
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
                <FormGroup>
                    <Label for="exampleSelect">Type</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={handleTypeSelect}>
                        {types.vehicleType.map(type => (
                            <option
                                id={type.id.toString()}
                                value={type.id}
                                selected={selectedVehicleType ? selectedVehicleType.id == type.id : false }
                            >
                                {type.name}

                            </option>))}
                    </Input>
                    <Label for="exampleSelect">SubType</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={handleSubTypeSelect}>
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
                <FormGroup>
                    <Label for="exampleSelect">Brand</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={handleBrandSelect}>
                        {brands.brands.map(brand => (
                            <option
                                id={brand.id.toString()}
                                value={brand.id}
                                selected={selectedBrand ? selectedBrand.id == brand.id : false }
                            >
                                {brand.name}
                            </option>))}
                    </Input>
                    <Label for="exampleSelect">SubBrand</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={handleModelSelect}>
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
                <Button>Filter</Button>
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