import React, {ChangeEvent, FC, ReactElement, useRef, useState} from "react";
import Input from "./Input";

type InputWithButtonProps = {
    isVisible: boolean,
    onSave: (newText: string) => void;
}

type InputWithButtonState = {
    newText: string
}


const InputWithButton: FC<InputWithButtonProps> = (props: InputWithButtonProps): ReactElement | null=> {

    const [state, setState] = useState<InputWithButtonState>({newText: ''});
    
    let clearInput: () => void;
    

    function onValueChange(event: ChangeEvent<HTMLInputElement>) {
        setState({newText: event.target.value});

        return function (p1: React.MouseEvent<SVGSVGElement>) {};
    }
    
    function onSaveClicked(event: React.MouseEvent<HTMLButtonElement>){
        clearInput();
        props.onSave(state.newText);
    }
    
    return (
        <span>
        <Input isVisible={props.isVisible} name={''} onChange={onValueChange} placeholder={"edit subtype"} type={'text'} setClear={clear => clearInput = clear}/>
        <button onClick={onSaveClicked} >Save</button>
        </span>
    );
}

export default InputWithButton;



