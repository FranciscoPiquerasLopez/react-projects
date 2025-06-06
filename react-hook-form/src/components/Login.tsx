import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormInputs } from "../interfaces/FormInputs";
import Menu from "./Menu";
import { NavLink } from "react-router";
import Input from "./Input";

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            user: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

    return (
        <>
            <Menu />
            <form onSubmit={handleSubmit(onSubmit)} className='formulario'>
                <div className='input-container'>
                    <div className='formulario-seccion'>
                        <label className='formulario-section-label' htmlFor="user">Username</label>
                        <Input
                            nameInput="user"
                            inputErrorProperty={errors.user}
                            registerForm={register}
                            patternProp={
                                {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Solo letras, números y guiones bajos',
                                }
                            } />
                    </div>
                    <div className='formulario-seccion'>
                        <label className='formulario-section-label' htmlFor="password">Password</label>
                        <Input
                            nameInput="password"
                            inputErrorProperty={errors.password}
                            registerForm={register}
                            patternProp={
                                {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                    message: 'Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo',
                                }
                            } />
                    </div>
                    <NavLink to="/register">
                        Create an account
                    </NavLink>
                </div>
                <button>Login</button>
            </form>
        </>
    );
};

export default Login;