import React, {useEffect, useState} from 'react'
import {Vehicle} from "./interface";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

type VehicleProps = {
    vehicle: Vehicle
};


const VehicleFC: React.FC<VehicleProps> = ({
    vehicle
 }) => {
    
    return (
        <Card style={{'width': '30%'}}>
            <CardImg top width="100%" src={vehicle.image} alt="vehibcle image" />
            <CardBody>
                <CardTitle tag="h5">{vehicle.nickname}</CardTitle>
                
                <CardText>Info: {vehicle.description}</CardText>
                <CardText>Date: {vehicle.createDate}</CardText>
                {/*<CardText>*/}
                {/*    <small className="text-muted">{vehicle.}</small>*/}
                {/*</CardText>*/}
            </CardBody>
        </Card>
    )
}

export default VehicleFC;