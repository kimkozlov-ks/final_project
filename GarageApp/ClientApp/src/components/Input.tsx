import React, {
    ChangeEvent,
    FC, useEffect,
    useRef
} from "react";

interface Action<T>
{
    (item: T): void;
}


type InputProps = {
    isVisible: boolean,
    name: string,
    placeholder: string,
    type: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    setClear: Action<() => void>
}

const Input: FC<InputProps> = (props) => {
    
    const inputRef = useRef<HTMLInputElement>(null);

    props.setClear(clear);
    
    if(!props.isVisible)
    {
        return null;
    }
    
    function clear()
    {
        if(inputRef && inputRef.current)
        {
            inputRef.current.value = '';
        }
    }
    
    return (
            <input 
                name={props.name} 
                placeholder={props.placeholder} 
                type={props.type}
                onChange={props.onChange}
                ref={inputRef}
            />
    );
}

export default Input;