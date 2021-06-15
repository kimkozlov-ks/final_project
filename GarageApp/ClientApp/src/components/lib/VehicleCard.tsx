import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardImg, CardText, CardTitle, Button, Toast} from "reactstrap";
import {post} from "../../services/HttpClient";
import {Vote, Vehicle} from "../../helpers/interface";
import moment from "moment";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { actionCreators}  from "../../store/VehicleStore";

type VehicleProps = {
    vehicle: Vehicle
    incrementRating?: () => void
    isVoteEnabled: boolean
};

type ReduxProps = typeof actionCreators

type Props = ReduxProps &
    VehicleProps

const VehicleCard: React.FC<Props> = ({
    vehicle, 
    incrementRating,
    isVoteEnabled,
    setActiveVehicleId
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


    function handleReadMore() {
        setActiveVehicleId(vehicle.id)
    }

    return (
        <Card style={{'width': '31%', 'height': '500px', margin: '10px'}}>
            <CardImg top height="40%" src={vehicle.image} alt="vehibcle image"  />
            <CardBody >
                <CardTitle tag="h5">{vehicle.nickname}</CardTitle>
                <CardText>Rating: {vehicle.rating + ratingIncrement}</CardText>
                <CardText>Create Date: { 
                    moment(vehicle.createDate).format('MMMM Do YYYY, h:mm')}</CardText>
            </CardBody>
            <Link to="/vehicle" onClick={handleReadMore} >
                Read more
            </Link>
            {
                isVoteEnabled 
                    ?  <Button block disabled={isVoteDisabled} onClick={handleVote}>Vote</Button> 
                    : null 
            }
        </Card>
    )
}

export default connect(
    () => {},
    {
        setActiveVehicleId: actionCreators.setActiveVehicleId
    }
)(VehicleCard as any)


