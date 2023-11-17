import React from 'react';
import {Alert, Button, Form} from "react-bootstrap";

type formGroup = {
    controlId: string;
    label: string;
    placeholder: string;
    type: string;
    onChange: ({target: {value}}) => void;
    isRequired: boolean;
}

export const SubmitForm = ({ title, onSubmit, buttonText, groups, error, style, children }:  {title: string, onSubmit: (ev) => void | Promise<void>, buttonText: string, groups: formGroup[], error?: string, style?: object, children?: React.ReactNode}) => {
    return (
        <Form className={`bg-white rounded p-3 w-100`} style={style} onSubmit={onSubmit}>
            <h1 className={"text-center"}>{title}</h1>
            {error ? <Alert variant={"danger"}>{error}</Alert> : ""}
            {groups.map((group, idx) => (
                <Form.Group key={idx} className={"mb-3"} controlId={group.controlId}>
                    <Form.Label column={"lg"}>{group.label}</Form.Label>
                    <Form.Control className={"bg-white"} type={group.type} placeholder={group.placeholder} onChange={group.onChange} required={group.isRequired}/>
                </Form.Group>
            ))}
            <Button className={"w-100"} variant={"primary"} type={"submit"}>{buttonText}</Button>
            {children}
        </Form>
    );
};