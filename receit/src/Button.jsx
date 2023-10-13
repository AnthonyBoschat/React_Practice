import React from "react";

function Button({element}) {

    function handleClick(){
        console.log("controle")
    }

    return(
        <button onClick={handleClick}> {element.name} </button>
    );

}

export default Button;