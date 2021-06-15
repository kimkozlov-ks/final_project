import React, {useEffect, useState} from "react";
import {Vehicle} from "../../helpers/interface";
import {get} from "../../services/HttpClient";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {Label} from "reactstrap";
import {useLocation, useParams} from "react-router";



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

export default VehicleFull