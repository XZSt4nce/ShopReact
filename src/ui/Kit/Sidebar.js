import {Offcanvas} from "react-bootstrap";

export const Sidebar = ({title, container, show, setShow, placement="start"}) => {
    return (
        <Offcanvas backdropClassName={"d-flex flex-column"} className={"px-2"} show={show} placement={placement} onHide={() => setShow(false)} style={{color: "white"}}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={"w-100 h-100"}>
                {container}
            </Offcanvas.Body>
        </Offcanvas>
    )
};