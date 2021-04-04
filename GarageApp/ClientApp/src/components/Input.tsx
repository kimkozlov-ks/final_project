import React, {ChangeEvent, FC, ReactElement} from "react";

type InputProps = {
    isVisible: boolean,
    name: string,
    placeholder: string,
    type: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = function input(props: InputProps): ReactElement | null {
    
    if(!props.isVisible)
    {
        return null;
    }
    
    return (
            <input 
                name={props.name} 
                placeholder={props.placeholder} 
                type={props.type}
                onChange={props.onChange}
            />
    );
}

export default Input;