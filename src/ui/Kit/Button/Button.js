import "./Button.css";

export const Button = ({ id, text, onClick, type, inputType }) => {
    if (inputType) {
        return (
            <input id={id} type={inputType} value={text} className={`${type} button`}/>
        );
    }
    return (
        <button id={id} onClick={onClick} className={`${type} button`}>{text}</button>
    );
};