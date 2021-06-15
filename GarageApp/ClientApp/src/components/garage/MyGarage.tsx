import React, {useEffect, useState} from 'react'
import {Vehicle} from "./interface";
import VehicleFC from "./Vehicle";
import {get} from "../../services/HttpClient"

type MyGarageProps = {
};

const MyGarage = () => {
    
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    
    useEffect(() =>  {
        async function fetchVehicles() {
            const result = await get(process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/my');
            if(result.success){
                setVehicles(result.body)
            }
        }
        
        fetchVehicles().then(r => r).catch()
    }, [])
    
    return (
        <div>
            {vehicles.map(vehicle => <VehicleFC vehicle={vehicle}/>)}
        </div>
    )
}

export default MyGarage;