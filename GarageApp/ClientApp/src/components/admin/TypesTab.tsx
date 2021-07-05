import * as React from 'react'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ApplicationState} from "../../store";
import {connect} from "react-redux";
import * as TypesStore from "../../store/adminAreaStore/TypesStore";
import {SubType, Type} from "../../store/adminAreaStore/TypesStore";
import {ChangeEvent, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import InputWithButton from "../InputWithButton";

type TypesProps =
    TypesStore.TypesState &
    typeof TypesStore.actionCreators;

function TypesTab(typesProps: TypesProps) {
    
    const [inputValues, setInput] = useState(['']);
    const [addTypeInput, setAddTypeInput] = useState('');

    function renderSubtypes(type: Type)
    {
        if(type.subTypes === undefined) return null;

        return (
            <ul>
                {type.subTypes.map((subtype, index) =>
                    <li key={subtype.id}>
                        {subtype.name}
                        <InputWithButton  isVisible={true} key={index} onSave={(newText: string) => typesProps.editSubType({id: subtype.id, name: newText, transportId: subtype.transportId})}/>
                    </li> )}
            </ul>
        );
    }

    function addSubType(id: number, index: number) {
        typesProps.addSubtype(id, inputValues[index]);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const { value } = event.target;
        inputValues[index] = value;

        let newArr = [...inputValues];
        newArr[index] = value;

        setInput(newArr);
    }

    return (
        <div>
            <ul>
                {
                    typesProps.vehicleType.map((el, index) => 
                    {
                        if(el === undefined) return null
                        
                        return (
                        <li key={index} >
                            {el.name}
                            {renderSubtypes(el)}
                            <input name={el.name} placeholder={'new subtype'}  value={inputValues[index]} type='text' onChange={(event) => handleChange(event, index)}
                            />
                            <button onClick={() => addSubType(el.id, index)}>Add</button>

                        </li>)
                    })
                }
            </ul>

            <input
                name={'AddType'}
                placeholder={'new type'}
                value={addTypeInput} type='text' onChange={(event) =>         setAddTypeInput(event.target.value)}
            />
            <button onClick={() => typesProps.addType(addTypeInput)}>Add</button>
        </div>
    );
}

let withConnect = connect(
    (state: ApplicationState) => {
        return state.types
    },
    TypesStore.actionCreators
)(TypesTab as any)

export default withConnect;

// export default compose(
//     withAuthRedirect
// )(withConnect);