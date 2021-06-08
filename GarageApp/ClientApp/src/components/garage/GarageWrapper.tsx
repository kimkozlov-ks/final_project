import React, {useState} from 'react';
import MyGarage from "./MyGarage";
import AddMyVehicleForm from "./AddMyVehicleForm";

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
                    <button onClick={() => setState(GarageState.ADD)}>Add vehicle</button>
                    <MyGarage/>
                </>
            case GarageState.ADD:
                return <>
                    <button onClick={() => setState(GarageState.MY_GARAGE)}>BACK to my garage</button>
                    <AddMyVehicleForm/>
                </>
            default:
                return <div>MY_GARAGE</div>
        }
    }

    return <>
        {redrerSwitch()}
    </>
}

export default GarageWrapper;