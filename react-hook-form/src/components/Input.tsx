import { type FieldError, type UseFormRegister } from "react-hook-form";
import type { FormInputs } from "../interfaces/FormInputs";

type NameInput = "user" | "password";

interface InputProps {
    nameInput: NameInput;
    inputErrorProperty: FieldError | undefined;
    registerForm: UseFormRegister<FormInputs>;
    patternProp: {
        value: RegExp;
        message: string;
    };
};

const Input = ({ nameInput, inputErrorProperty, registerForm, patternProp }: InputProps) => {

    return (
        <>
            <input
                {...registerForm(`${nameInput}`, {
                    required: true,
                    minLength: 10,
                    maxLength: 20,
                    pattern: patternProp
                })}
                aria-invalid={inputErrorProperty ? "true" : "false"}
                type="text"
                id={nameInput}
                name={nameInput}
                className='formulario-section-input'
            />
            {
                inputErrorProperty?.type === "required" && (
                    <p style={{ color: 'red' }} role='alert'>Campo obligatorio</p>
                )
            }
            {
                inputErrorProperty?.type === "minLength" && (
                    <p style={{ color: 'red' }} role="alert">Entre 10 y 20 letras</p>
                )
            }
            {
                inputErrorProperty?.type === "pattern" && (
                    <p style={{ color: 'red' }} role="alert">{patternProp.message}</p>
                )
            }
        </>
    );
};

export default Input;