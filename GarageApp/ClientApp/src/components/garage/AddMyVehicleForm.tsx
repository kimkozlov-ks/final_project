import React, {Dispatch, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {post} from "../../services/HttpClient"
import {baseUrl} from "../../auth/helpers/constants";
import {red} from "@material-ui/core/colors";

type ParentProps = {
    back: () => void
}

type ReduxProps =
{
    types: TypesStore.TypesState
    brands: BrandsStore.BrandsState
}

type Props = ParentProps &
    ReduxProps

const AddMyVehicleForm: React.FC<Props> = ({
    back,
    types,
    brands,
}) => {
  
    const [selectedVehicleType, setSelectedVehicleType] = useState<TypesStore.Type>(types.vehicleType[0]);
    const [selectedSubVehicleType, setSelectedSubVehicleType] = useState<TypesStore.SubType>(types.vehicleType[0].subTypes[0]);
    const [selectedBrand, setSelectedBrand] = useState<BrandsStore.Brand>(brands.brands[0]);
    const [selectedModel, setSelectedSubBrand] = useState<BrandsStore.Model>(brands.brands[0].models[0]);
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null >(null)
    const [error, setError] = useState('')

    async function handleSubmit(event: any){
        event.preventDefault()
        if( selectedVehicleType && 
            selectedSubVehicleType && 
            selectedBrand && 
            selectedModel && 
            nickname &&
            description &&
            image){
            const data = new FormData();
            data.append("nickname", nickname);
            data.append("transporttypeid", selectedVehicleType.id.toString());
            data.append("transportsubtypeid", selectedSubVehicleType.id.toString());
            data.append("transportbrandid", selectedBrand.id.toString());
            data.append("transportmodelid", selectedModel.id.toString());
            data.append("description", description);
            data.append("image", image);
            const res  = await post( process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/add', data )
            debugger
            if(res.success){
                back()
                return
            }
            
            if(res.statusCode! >= 500){
                setError("Server is not respond")
            }
            else if(res.statusCode! >= 400){
                setError("Incorrect input")
            }
            
            return
        }
        
        setError('Incorrect input')
    }
    
    function renderSelect(array: any){
        return array.map((el: any) =>
            <option value={el.id}>{el.name}</option>);
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

    function handleNickNameInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNickname(event.target.value)
    }

    function handleSubTypeSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedSubType = selectedVehicleType.subTypes.find(subtype => subtype.id.toString() === event.target.value)

        if(selectedSubType !== undefined) {
            setSelectedSubVehicleType(prevState => selectedSubType)
        }
    }

    function handleModelSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedModel = selectedBrand.models.find(model => model.id.toString() === event.target.value)

        if(selectedModel !== undefined) {
            setSelectedSubBrand(selectedModel)
        }
    }

    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }

    function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
        //@ts-ignore
        setImage(event.target.files[0])
    }

    return (
        <Form onSubmit={handleSubmit}>
            <p style={{'color': "red"}}>{error}</p>
            <FormGroup>
                <Label for="vehicleName">Nickname</Label>
                <Input type="text" name="text" id="vehicleName" onChange={handleNickNameInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Type</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={handleTypeSelect}>
                    {types.vehicleType.map(type => (<option id={type.id.toString()} value={type.id}>{type.name}</option>))}
                </Input>
                <Label for="exampleSelect">SubType</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={handleSubTypeSelect}>
                    {
                        types.vehicleType.map(type => {
                            if(selectedVehicleType && type.id === selectedVehicleType.id){
                                return type.subTypes.map(subType => (
                                    <option id={subType.id.toString()} value={subType.id}>{subType.name}</option>));
                            }
                        })
                    }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Brand</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={handleBrandSelect}>
                    {brands.brands.map(brand => (<option id={brand.id.toString()} value={brand.id}>{brand.name}</option>))}
                </Input>
                <Label for="exampleSelect">SubBrand</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={handleModelSelect}>
                    {
                            brands.brands.map(brand => {
                                if(selectedBrand && brand.id === selectedBrand.id){
                                    return brand.models.map(model => (
                                        <option id={model.id.toString()} value={model.id}>{model.name}</option>));
                            }
                        })
                    }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" onChange={handleDescriptionChange} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" accept="image/png, image/png, image/jpeg" onChange={handleImageSelect}/>
                <FormText color="muted">
                    Select a photo
                </FormText>
                {image ? <img width={400}  src={URL.createObjectURL(image)}/> : null}
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}


const withConnect = connect(
    (state: ApplicationState) => {
        return {
            types: state.types,
            brands: state.brands
        };
    }
)(AddMyVehicleForm)

export default withConnect;