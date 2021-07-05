import { InputHTMLAttributes } from 'react';
import { InputEnum } from '../../../../enum';
import { Input } from '../input.component';
import "./input-label.css"

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: string,
    inputType: InputEnum,
    onChange: (n: any) => void
}


export const InputLabel = (props: InputLabelProps) => {

    const { label, name, inputType } = props;

    const { password } = InputEnum;

    return (
        <div className="input-label" >
            <label className="input-label__label" htmlFor={name}>
                {label}
            </label>
            <Input type={inputType === password ? "password" : "text"} className="input-label__input" {...props} />
        </div>
    )
}