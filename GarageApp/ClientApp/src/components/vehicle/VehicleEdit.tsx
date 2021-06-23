import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {Vehicle} from "../../helpers/interface";
import {Form, FormGroup, Label, Input, FormText, Button} from "reactstrap";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import {get, post} from "../../services/HttpClient"
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


const VehicleEdit: React.FC<ReduxProps> = ({
    brands,
    types
}) => {

    // @ts-ignore
    const id = useParams()['id']
    const history = useHistory();

    const [vehicle, setVehicle] = useState<Vehicle | null>(null)

    const [selectedVehicleType, setSelectedVehicleType] = useState<TypesStore.Type | null>(null);
    const [selectedSubVehicleType, setSelectedSubVehicleType] = useState<TypesStore.SubType | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<BrandsStore.Brand | null>(null);
    const [selectedModel, setSelectedSubBrand] = useState<BrandsStore.Model | null>(null);
    const [nickname, setNickname] = useState('')
    const [description, setDescription] = useState('')
    const [imageFromFile, setImageFromFile] = useState<File | null>(null)
    const [image, setImage] = useState<string>('')
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
            debugger
            data.append("id", vehicle!.id);
            data.append("nickname", nickname);
            data.append("transporttypeid", selectedVehicleType.id.toString());
            data.append("transportsubtypeid", selectedSubVehicleType.id.toString());
            data.append("transportbrandid", selectedBrand.id.toString());
            data.append("transportmodelid", selectedModel.id.toString());
            data.append("description", description);
            if(imageFromFile) data.append("image", imageFromFile);
            const res  = await post( process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/edit', data )

            if(res.success){
                history.push(`/vehicle/${id}`)
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

    async function fetchVehicle() {
        const url = process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/' + id
        const result = await get(url);
        if(result.success){
            setVehicle(result.body)
            setNickname(result!.body.nickname)
            setDescription(result!.body.description)
            setImage(result!.body.image)

            const typeUrl = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/transportType/' + result.body.transportTypeId
            const subTypeUrl = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/transportType/subtype/' + result.body.transportSubTypeId
            const brand = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/transportBrand/' + result.body.transportBrandId
            const modelUrl = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/TransportModel/' + result.body.transportModelId

            const typeRes = await get(typeUrl);
            if(typeRes.success){
                setSelectedVehicleType(typeRes.body)
            }

            const subTypeRes = await get(subTypeUrl);
            if(subTypeRes.success){
                setSelectedSubVehicleType(subTypeRes.body)
            }

            const brandRes = await get(brand);
            if(brandRes.success){
                setSelectedBrand(brandRes.body)
            }

            const modelRes = await get(modelUrl);
            if(modelRes.success){
                setSelectedSubBrand(modelRes.body)
            }
        }else{
            console.warn(`Fail... fetch info about vehicle id = #${id}`)
        }
    }
    
    useEffect(() => {
        fetchVehicle().catch()
    }, [])

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

    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }

    function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
        //@ts-ignore
        setImage(event.target.files[0])
    }
    
    return(
        <Form onSubmit={handleSubmit}>
            <p style={{'color': "red"}}>{error}</p>
            <FormGroup>
                <Label for="vehicleName">Nickname</Label>
                <Input type="text" name="text" id="vehicleName" onChange={handleNickNameInput} value={nickname}/>
            </FormGroup>
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
            <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" onChange={handleDescriptionChange}  value={description}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" accept="image/png, image/png, image/jpeg" onChange={handleImageSelect}/>
                <FormText color="muted">
                    Select a photo
                </FormText>
                {imageFromFile ? <img width={400}  src={URL.createObjectURL(image)}/> : image ? <img width={400}  src={image}/> : null}
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
)(VehicleEdit)

export default withConnect;
