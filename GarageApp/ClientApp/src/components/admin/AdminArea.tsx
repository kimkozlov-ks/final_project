import * as React from 'react'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ApplicationState} from "../../store";
import {connect} from "react-redux";
import * as AdminAreaStore from "../../store/AdminAreaStore";
import {Type} from "../../store/AdminAreaStore";
import {useRef, useState} from "react";

type AdminAreaProps =
    AdminAreaStore.AdminAreaState &
    typeof AdminAreaStore.actionCreators;

function AdminArea(adminAreaProps: AdminAreaProps) {

    const [inputValues, setInput] = useState(['']);
    let checked = 'Types';
    
    function onValueChange(event: React.FormEvent<HTMLInputElement>) {
        adminAreaProps.getTypes();
    }
    
    function onClickType(id: number) {
        adminAreaProps.getSubType(id);
    }
    
    function getDropdown(type: Type)
    {   
        if(type.subTypes === undefined) return;

        return <select>{type.subTypes.map((subtype, index) => <option key={index}>{subtype.name}</option>)}</select>;
    }

    function addSubType(id: number, index: number) {
        adminAreaProps.addSubtype(id, inputValues[index]);
    }
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const { name, value } = event.target;
        console.log(inputValues[index]);
        inputValues[index] = value;

        let newArr = [...inputValues]; 
        newArr[index] = value; 

        setInput(newArr); 
    }

    return (
        <div>
            <input type="radio" checked={true} onChange={onValueChange}/> Types
            <input type="radio" onClick={onValueChange}/> Models
            <ul>
                {
                    adminAreaProps.vehicleType.map((el, index) => 
                    <li onClick={() => onClickType(el.id)} >
                        {el.name}
                        {getDropdown(el)}
                        <input name={el.name} defaultValue={''} placeholder={'new subtype'}  value={inputValues[index]} type='text' onChange={(event) => handleChange(event, index)}
                        />
                        <button onClick={() => addSubType(el.id, index)}>Add</button>
                    </li>)
                }
            </ul>
           
        </div>
    );
}

let withConnect = connect(
    (state: ApplicationState) => {
        return state.adminArea
    },
    AdminAreaStore.actionCreators
)(AdminArea as any)

export default withConnect;

// export default compose(
//     withAuthRedirect
// )(withConnect);