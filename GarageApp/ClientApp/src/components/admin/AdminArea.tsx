import * as React from 'react'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ApplicationState} from "../../store";
import {connect} from "react-redux";
import * as AdminAreaStore from "../../store/AdminAreaStore";
import {SubType, Type} from "../../store/AdminAreaStore";
import {ChangeEvent, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import InputWithButton from "../InputWithButton";

type AdminAreaProps =
    AdminAreaStore.AdminAreaState &
    typeof AdminAreaStore.actionCreators;

function AdminArea(adminAreaProps: AdminAreaProps) {

    console.log(adminAreaProps.vehicleType);

    const [inputValues, setInput] = useState(['']);
    let checked = 'Types';
    
    function onValueChange(event: React.FormEvent<HTMLInputElement>) {
        adminAreaProps.getTypes();
    }
    
    function onClickType(event: React.MouseEvent, id: number) {
        adminAreaProps.getSubType(id);
    }
    
    function renderSubtypes(type: Type)
    {   
        if(type.subTypes === undefined) return;
        
        return (
            <ul>
                {type.subTypes.map((subtype, index) => 
                    <li key={subtype.id}>
                    {subtype.name}
                    {/*<FontAwesomeIcon icon={faEdit} onClick={() => onEditClick( subtype.id)}/>*/}
                    <InputWithButton  isVisible={true} key={index} onSave={(newText: string) => adminAreaProps.editSubType({id: subtype.id, name: newText, transportId: subtype.transportId})}/>
                </li> )}
            </ul>
        );
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
                    <li key={index} onClick={(event) => onClickType(event, el.id)} >
                        {el.name}
                        {renderSubtypes(el)}
                        <input name={el.name} placeholder={'new subtype'}  value={inputValues[index]} type='text' onChange={(event) => handleChange(event, index)}
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