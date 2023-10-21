import "../Style/Input.css"
import { InputContext } from "../Context/InputContext"
import { useContext } from "react"

function Input(){

    const {inputValue, setInputValue} = useContext(InputContext)

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    return(
        <div id="inputTextBox">
            <label className="inputTextLabel" htmlFor="inputText">Message</label>
            <input onChange={handleChange} value={inputValue} type="text" id="inputText"></input>
        </div>
    )
}

export default Input