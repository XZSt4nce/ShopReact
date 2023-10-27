import "./Message.css";

export const Message = ({ msg }) => {
    return (
        <p id={"msg"} className={msg.type} style={{top: -150  * msg.hidden + 10}} onClick={() => msg.setHidden(true)}>{msg.text}</p>
    );
};