import React, {useState} from 'react';
import MyGarage from "./MyGarage";
import AddMyVehicleForm from "./AddMyVehicleForm";
import {Button} from "reactstrap";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type GarageWrapperProps = {};

enum GarageState
{
    MY_GARAGE = 0,
    ADD = 1
}

function GarageWrapper(props: GarageWrapperProps) {

    const [state, setState] = useState(GarageState.MY_GARAGE);
    function redrerSwitch()
    {
        switch (state) {
            case GarageState.MY_GARAGE:
                return<>
                    <Button onClick={() => setState(GarageState.ADD)}>Add my vehicle</Button>
                    <MyGarage/>
                </>
            case GarageState.ADD:
               
                return <>
                    <Button onClick={() => setState(GarageState.MY_GARAGE)} >← Back</Button>
                    <AddMyVehicleForm back={() => setState(GarageState.MY_GARAGE)}/>
                </>
            default:
                return <div>MY_GARAGE</div>
        }
    }

    return <>
        {redrerSwitch()}
    </>
}

export default compose(
    withAuthRedirect
)(GarageWrapper, '/login-form');
