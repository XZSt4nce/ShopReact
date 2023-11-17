import React, {useContext, useState} from 'react';
import {StateContext} from "../../core/StateContext";
import {Link, useHistory} from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap";

const RegisterPage = () => {
    const [address, setAddress] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const {signUp} = useContext(StateContext);

    const onSignUp = async (ev) => {
        ev.preventDefault();
        if (password === confirmPassword) {
            setError("");
            await signUp(address, login, password)
                .then(() => history.push("/products"))
                .catch(error => setError(error.toString().substring(43)));

        } else {
            setError("Passwords don't match!");
        }
    };

    return (
        <div className={'w-100 h-100 d-flex flex-column gap-5 align-items-center justify-content-center p-3'}>
            <Form className={`bg-white rounded p-3 w-100`} style={{maxWidth: "50rem"}} onSubmit={onSignUp}>
                <h1 className={"text-center"}>Sign Up</h1>
                {error ? <Alert variant={"danger"}>{error}</Alert> : ""}
                <Form.Group className={"mb-3"} controlId={"formSignUpAddress"}>
                    <Form.Label column={"lg"}>Address</Form.Label>
                    <Form.Control className={"bg-white"} type={"text"} placeholder={"Enter wallet address"} onChange={({target: {value}}) => setAddress(value)} required/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formSignUpLogin"}>
                    <Form.Label column={"lg"}>Login</Form.Label>
                    <Form.Control className={"bg-white"} type={"text"} placeholder={"Enter login"} onChange={({target: {value}}) => setLogin(value)} required/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formSignUpPassword"}>
                    <Form.Label column={"lg"}>Password</Form.Label>
                    <Form.Control className={"bg-white"} type={"password"} placeholder={"Enter password"} onChange={({target: {value}}) => setPassword(value)} required/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formSignUpRepeatPassword"}>
                    <Form.Label column={"lg"}>Confirm password</Form.Label>
                    <Form.Control className={"bg-white"} type={"password"} placeholder={"Repeat password"} onChange={({target: {value}}) => setConfirmPassword(value)} required/>
                </Form.Group>
                <Button className={"w-100"} variant={"primary"} type={"submit"}>Register</Button>
                <div className={"d-flex flex-row justify-content-end"}>
                    <Link to={'/'}>Already have an account?</Link>
                </div>
            </Form>
        </div>
    );
};

export default RegisterPage;