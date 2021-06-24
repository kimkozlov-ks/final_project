import React from 'react'
import VehicleList from "./VehiclesList";
import {get} from "../../services/HttpClient";
import BestVehicle from "../vehicle/BestVehicle";
import Filters from "../filtres/Filters";

const HomeWrapper: React.FC<{}> = () => {
    return (
        <>
            <BestVehicle>
            </BestVehicle>
            <VehicleList 
                isVoteEnabled={true}
                baseUrl={process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle'}>
            </VehicleList>
            <Filters/>
        </>
    )
}

export default HomeWrapper