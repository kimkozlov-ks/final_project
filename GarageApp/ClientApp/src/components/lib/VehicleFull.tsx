import React, {useEffect, useState} from "react";
import {Vehicle} from "../../helpers/interface";
import {get} from "../../services/HttpClient";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {Label} from "reactstrap";
import {useLocation, useParams} from "react-router";
import {Brand} from "../../store/adminAreaStore/BrandsStore";
import {Type} from "../../store/adminAreaStore/TypesStore";

type Props = {
    brands: Brand[],
    types: Type[]
}

const VehicleFull: React.FC<{}> = ({
}) => {
    // @ts-ignore
    const id = useParams()['id']
    
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)

    async function fetchVehicle() {
       const url = process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/' + id
        const result = await get(url);
        if(result.success){
            setVehicle(result.body)
        }
    }
    
    useEffect(()=>{
        fetchVehicle().catch()
    })

    function renderData() {
        return(
        <>
            <img style={{width: '100%'}} src={vehicle!.image}/>
            <Label>
                <h3>
                    Nickname: {vehicle!.nickname}
                </h3>
            </Label>
            <Label>
                
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

const withConnect = connect(
    (state: ApplicationState) => {
        return {
            brands: state.brands,
            types: state.types
        }
    },
)(VehicleFull as any)

export default withConnect;
