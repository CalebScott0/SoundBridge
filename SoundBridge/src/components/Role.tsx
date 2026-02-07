import {useState} from "react";
import '@/components/ui/rolebutton.css';
const RoleButton = (role) => {
    const [isToggled, setToggled] = useState('#b6b3b3');

    const handleClick = () => {
       setToggled(!isToggled);    

    }

    const myStyle = {
                backgroundColor: isToggled ? "#b6b3b3" : "#000000",
                color: isToggled ? "black" : "white",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
                fontWeight: "500"
    };

    return (
        <>
            <div className = "role-button-div">
                <button className = "role-button" onClick = {handleClick} style={myStyle}>{role.name}</button>
            </div>
        </>
    );
}

export default RoleButton;