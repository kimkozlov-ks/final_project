import React, {useEffect, useState} from "react";
import {Vehicle} from "../../helpers/interface";
import {get} from "../../services/HttpClient";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";

type Props = {
    id: string
}


const VehicleFull: React.FC<Props> = ({
   id
}) => {
    
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)

    async function fetchVehicle() {
       const url = process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/' + id
        const result = await get(url);
        debugger
        if(result.success){
            setVehicle(result.body)
        }
    }
    
    useEffect(()=>{
        fetchVehicle().catch()
    },[])

    function renderData() {
        return <img src={vehicle!.image}/>;
    }

    return(
        <>
            {
                vehicle ? renderData() : null
            }
        </>
    )
}


export default connect((state: ApplicationState) => {
    return  {id: state.vehicles.activeVehicleId}
})(VehicleFull as any)