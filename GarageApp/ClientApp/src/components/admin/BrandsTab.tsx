import * as React from 'react'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {ApplicationState} from "../../store";
import {connect} from "react-redux";
import * as BrandsStore from "../../store/adminAreaStore/BrandsStore";
import {SubType, Type} from "../../store/adminAreaStore/TypesStore";
import {ChangeEvent, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import InputWithButton from "../InputWithButton";
import {Brand, Model} from "../../store/adminAreaStore/BrandsStore";

type BrandsProps =
    BrandsStore.BrandsState &
    typeof BrandsStore.actionCreators;

function BrandsTab(brandsProps: BrandsProps) {

    const [inputValues, setInput] = useState(['']);
    const [addTypeInput, setAddTypeInput] = useState('');
    
    function renderModels(brand: Brand)
    {
        if(brand.models === undefined) return;

        return (
            <ul>
                {brand.models.map((model, index) =>
                    <li key={model.id}>
                        {model.name}
                        <InputWithButton  isVisible={true} key={index} onSave={(newText: string) => brandsProps.editModel({id: model.id, name: newText, brandId: brand.id})}/>
                    </li> )}
            </ul>
        );
    }

    function addSubType(id: number, index: number) {
        brandsProps.addModel(id, inputValues[index]);
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
                    brandsProps.brands.map((el, index) =>
                        <li key={index}  >
                            {el.name}
                            {renderModels(el)}
                            <input name={el.name} placeholder={'new subtype'}  value={inputValues[index]} type='text' onChange={(event) => handleChange(event, index)}
                            />
                            <button onClick={() => addSubType(el.id, index)}>Add</button>

                        </li>)
                }
            </ul>

            <input
                name={'AddType'}
                placeholder={'new type'}
                value={addTypeInput} type='text' onChange={(event) =>         setAddTypeInput(event.target.value)}
            />
            <button onClick={() => brandsProps.addBrand(addTypeInput)}>Add</button>
        </div>
    );
}

const withConnect = connect(
    (state: ApplicationState) => {
        return state.brands
    },
    BrandsStore.actionCreators
)(BrandsTab as any)

export default withConnect;

// export default compose(
//     withAuthRedirect
// )(withConnect);