import React, {useEffect, useState} from "react";
import {Vehicle} from "../../helpers/interface";
import {get} from "../../services/HttpClient";
import {Button, Label} from "reactstrap";
import {useLocation, useParams} from "react-router";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as AuthStore from "../../auth/AuthStore";
import {Link} from "react-router-dom";

type AuthRedirectProps =
    AuthStore.AuthState;

const VehicleFull: React.FC<AuthRedirectProps> = ({
    userInfo
}) => {
    // @ts-ignore
    const id = useParams()['id']
    
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)
    const [vehicleType, setVehicleType] = useState('')
    const [subType, setSubType] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')

    async function fetchVehicle() {
       const url = process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/' + id
        const result = await get(url);
        if(result.success){
            setVehicle(result.body)

            const typeUrl = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/transportType/' + result.body.transportTypeId
            const subTypeUrl = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/transportType/subtype/' + result.body.transportSubTypeId
            const brand = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/transportBrand/' + result.body.transportBrandId
            const modelUrl = process.env.REACT_APP_TYPES_API_BASE_URL + 'api/TransportModel/' + result.body.transportModelId
            
            const typeRes = await get(typeUrl);
            if(typeRes.success){
                setVehicleType(typeRes.body.name)
            }

            const subTypeRes = await get(subTypeUrl);
            if(subTypeRes.success){
                setSubType(subTypeRes.body.name)
            }

            const brandRes = await get(brand);
            if(brandRes.success){
                setBrand(brandRes.body.name)
            }

            const modelRes = await get(modelUrl);
            if(modelRes.success){
                setModel(modelRes.body.name)
            }
        }else{            
            console.warn(`Fail... fetch info about vehicle id = #${id}`)
        }
    }
    
    async function fetchTypes(){
        if(!vehicle) return
    }
    
    useEffect(()=>{
        fetchVehicle().catch()
    }, [])
    
    function renderData() {
        return(
            <>    
                {userInfo.id == vehicle!.userId 
                    ?  <Link to={`/vehicle/edit/${vehicle!.id}`} >
                       Edit
                    </Link>
                    : null}
                <img style={{width: '100%'}} src={vehicle!.image}/>
                <Label style={{display: 'block'}}>
                    <h3>
                        Nickname: {vehicle!.nickname}
                    </h3>
                </Label>
                <Label style={{display: 'block'}}> 
                    Type: {vehicleType}
                </Label>
                <Label style={{display: 'block'}}>
                    Subtype:{subType}
                </Label>
    
                <Label style={{display: 'block'}}>
                    Brand: {brand}  
                </Label>
    
                <Label style={{display: 'block'}}>
                    Model: {model}
                </Label>
                <Label style={{display: 'block'}}>
                    Description: {vehicle!.description}
                </Label>
                <Label style={{display: 'block'}}>
                    Rating: {vehicle!.rating}
                </Label>
            </>
        )
    }

    return(
        <>
            {
                vehicle != null ? renderData() : null
            }
        </>
    )
}

export default connect(
    (state: ApplicationState) => {
        return {
            userInfo: state.authStore.userInfo
        }
    }
)(VehicleFull as any);
