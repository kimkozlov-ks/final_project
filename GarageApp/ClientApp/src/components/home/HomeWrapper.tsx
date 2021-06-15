import React from 'react'
import VehicleList from "./VehiclesList";
import {get} from "../../services/HttpClient";
import BestVehicle from "../lib/BestVehicle";

const HomeWrapper: React.FC<{}> = () => {
    return (
        <>
            <BestVehicle>
            </BestVehicle>
            <VehicleList baseUrl={process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle'}>
            </VehicleList>
        </>
    )
}

export default HomeWrapper