import React, {useEffect, useState} from 'react'
import {Vehicle} from "../../helpers/interface";
import {get} from "../../services/HttpClient"
import VehicleList from "../home/VehiclesList";

type MyGarageProps = {
};

const MyGarage = () => {
    
    return (
        <VehicleList 
            pageUrl={'garage/#'}
            baseUrl={process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vehicle/my'}/>
    )
}

export default MyGarage;