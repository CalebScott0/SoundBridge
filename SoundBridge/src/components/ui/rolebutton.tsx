import {useState} from "react";
import './rolebutton.css';
const RoleButton = (role) => {
    const [myStyle, clickStyle] = useState({
        backgroundColor: "#b6b3b3",
        color: "black",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        fontWeight: "500"
    });

    const handleClick = () => {
        let newStyle;

        if(role.name === "Guitarist"){
            newStyle = {
                backgroundColor: "#ff0000",
                color: "white"
            };
        } else {
            newStyle = {
                backgroundColor: "#703ee7",
                color: "white"
            };
        }
        clickStyle({
            ...myStyle,
            ...newStyle
        });
            }

    return (
        <>
            <div className = "role-button-div">
                <button className = "role-button" onClick = {handleClick} style={myStyle}>{role.name}</button>
            </div>
        </>
    );
}

export default RoleButton;