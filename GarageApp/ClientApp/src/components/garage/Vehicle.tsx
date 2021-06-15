import React, {useEffect, useState} from 'react'
import {Vehicle} from "./interface";
import {Card, CardBody, CardImg, CardText, CardTitle, Button, Toast} from "reactstrap";
import {post} from "../../services/HttpClient";
import {Vote} from "../../helpers/interface";
import moment from "moment";

type VehicleProps = {
    vehicle: Vehicle
    incrementRating?: () => void
};


const VehicleFC: React.FC<VehicleProps> = ({
    vehicle, 
    incrementRating
 }) => {
    
    const[isVoteDisabled, switchVote] = useState(false)
    const[ratingIncrement, setRatingIncrement] = useState(0)

    async function handleVote(){
        const vote: Vote = {
            vehicleId: vehicle.id,
            power: 1
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const res = await post(process.env.REACT_APP_GARAGE_API_BASE_URL + 'api/vote/',  JSON.stringify(vote), headers)
        
        debugger
        if(res.statusCode == 409){
            alert('You have already voted for this vehicle!')
            return;
        }
        
        if(!res.success){
        }
        else{
            setRatingIncrement(ratingIncrement + 1)
        }
    }

    return (
        <Card style={{'width': '30%', 'height': '500px' }}>
            <CardImg top height="40%" src={vehicle.image} alt="vehibcle image"  />
            <CardBody >
                <CardTitle tag="h5">{vehicle.nickname}</CardTitle>
                
                <CardText>Info: {vehicle.description}</CardText>
                {/*<CardText>*/}
                {/*    <small className="text-muted">{vehicle.}</small>*/}
                {/*</CardText>*/}
                <CardText>Rating: {vehicle.rating + ratingIncrement}</CardText>
                <CardText>Create Date: { 
                    moment(vehicle.createDate).format('MMMM Do YYYY, h:mm')}</CardText>
            </CardBody>
            <Button disabled={isVoteDisabled} onClick={handleVote}>Vote</Button>
        </Card>
    )
}

export default VehicleFC;