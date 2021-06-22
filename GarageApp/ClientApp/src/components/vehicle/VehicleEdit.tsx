import React, {useState} from "react";
import {useParams} from "react-router";
import {Vehicle} from "../../helpers/interface";


const VehicleEdit: React.FC<{}> = () => {

    // @ts-ignore
    const id = useParams()['id']

    const [vehicle, setVehicle] = useState<Vehicle | null>(null)
    
    return(
        <>
            VehicleEdit
        </>
    )
}

export default VehicleEdit