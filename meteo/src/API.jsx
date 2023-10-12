import React, { useContext, useEffect } from "react";
import "./API.css"
import APIContexte from "./contextAPI"
import checkboxContext from "./checkboxContext";

function API(){

    const {APIobject, updateAPIobject} = useContext(APIContexte)
    const {checkboxs, updateCheckboxs} = useContext(checkboxContext)



    
    function generateElement(key, value){
        const index = checkboxs.findIndex((element) => element.attribut === key)
        switch(key){
            case "temp":
                return(<div key={key}><span>{checkboxs[index].name} : {value}&deg;C</span></div>)
            case "humidity":
                return(<div key={key}><span>{checkboxs[index].name} : {value}%</span><i className="fa-solid fa-droplet littleIcone"></i></div>)
            case "wind":
                const true_wind_speed = value * 1.60934
                return(<div key={key}><span>{checkboxs[index].name} : {true_wind_speed.toFixed(0)} km/h</span><i className="fa-solid fa-wind littleIcone"></i></div>)
            case "pressure":
                return(<div key={key}><span>{checkboxs[index].name} : {value}hPa</span><i className="fa-solid fa-person-arrow-down-to-line littleIcone"></i></div>)
            case "weather":
                const image = `https://openweathermap.org/img/wn/${value}.png`
                return(<div key={key}><span>Ciel</span><img src={image} alt="Météo en cours"></img></div>)
        }

        
    }


    if(APIobject === null){
        return(
        <div><i className="fa-solid fa-cloud cloud"></i></div>
        )
    }
    else{
        return(
            <section id="APIbox">
                {Object.entries(APIobject).map(([key, value]) => generateElement(key, value))}
            </section>
        )
    }
    
}

export default API