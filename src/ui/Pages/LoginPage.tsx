import * as React from 'react';
import {useContext, useState} from "react";
import {StateContext} from "../../core/StateContext";
import {Link} from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap";

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {signIn} = useContext(StateContext);

    const onSignIn = async (ev) => {
        ev.preventDefault();
        await signIn(login, password)
            .catch(error => setError(error.toString().substring(43)));
    };

    return (
        <div className={'w-100 h-100 d-flex flex-column gap-5 align-items-center justify-content-center p-3'}>
            <Form className={`bg-white rounded p-3 w-100`} style={{maxWidth: "50rem"}} onSubmit={onSignIn}>
                <h1 className={"text-center"}>Sign In</h1>
                {error ? <Alert variant={"danger"}>{error}</Alert> : ""}
                <Form.Group className={"mb-3"} controlId="formSignInLogin">
                    <Form.Label column={"lg"}>Login</Form.Label>
                    <Form.Control className={"bg-white"} type={"text"} placeholder={"Enter login"} onChange={({target: {value}}) => setLogin(value)} required/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formSignInPassword"}>
                    <Form.Label column={"lg"}>Password</Form.Label>
                    <Form.Control className={"bg-white"} type={"password"} placeholder={"Enter password"} onChange={({target: {value}}) => setPassword(value)} required/>
                </Form.Group>
                <Button className={"w-100"} variant={"primary"} type={"submit"}>Log In</Button>
                <div className={"d-flex flex-row justify-content-between"}>
                    <Link to={'/register'}>Don't have an account yet?</Link>
                    <Link to={'/'}>Forgot your password?</Link>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;