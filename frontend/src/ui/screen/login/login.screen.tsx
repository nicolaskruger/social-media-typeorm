import { FunctionComponent } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputEnum, RoutesEnum } from "../../../enum";
import { useAuthApi, UserContext } from "../../../hooks";
import { useApiHandler } from "../../../hooks/api-handler";
import { User } from "../../../types";
import { InputLabel, LoadCenter, MessageComp } from '../../components';
import "./login.css";

export const Login: FunctionComponent = () => {
    const [email, setEmail] = useState('seki.musami@email.com');

    const [password, setPassword] = useState('Senhagrande123');

    const [, setUser] = useContext(UserContext);

    const { password: passawordType, standar } = InputEnum;

    const authApi = useAuthApi();

    const handler = useApiHandler();

    const history = useHistory();

    const { feed } = RoutesEnum;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();


        const response = await handler(async () => {
            return await authApi.login({ email, password })
        }, "login with success")

        setTimeout(() => {
            setUser(response as User);
            history.push(feed);
        }, 1000)

    }
    return (
        <div className="container login" >

            <h1>Login</h1>

            <form className="login__form" action="submit" onSubmit={handleSubmit} >

                <InputLabel name="email" label="email" onChange={setEmail} value={email} inputType={standar} />

                <InputLabel name="passaword" label="password" onChange={setPassword} value={password} inputType={passawordType} />
                <button className="login__button">
                    login
                </button>
                <LoadCenter />
                <MessageComp />
            </form>
        </div>
    )

}