import * as React from 'react';
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";

export const PopUp = ({ title, text, action=null, actionText }: {title: string, text: string, action?: any, actionText?: string}) => {
    const [modalShow, setModalShow] = useState(true);

    return (
        <Modal show={modalShow} centered onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                {action ? <Button variant="primary" onClick={action}>{actionText}</Button> : ""}
            </Modal.Footer>
        </Modal>
    );
};