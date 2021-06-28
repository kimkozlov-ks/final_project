import React, {useState} from 'react'
import VehicleList from "./VehiclesList";
import {get} from "../../services/HttpClient";
import BestVehicle from "../vehicle/BestVehicle";
import Filters from "../filtres/Filters";
import {homePageUrl} from "./constants";


const HomeWrapper: React.FC<{}> = () => {
    
    const [url, setUrl] = useState(homePageUrl);
    
    return (
        <>
            <BestVehicle>
            </BestVehicle>
            <VehicleList 
                isVoteEnabled={true}
                baseUrl={url}>
            </VehicleList>
            <Filters setFilter={(url: string) => setUrl(url)}/>
        </>
    )
}

export default HomeWrapper