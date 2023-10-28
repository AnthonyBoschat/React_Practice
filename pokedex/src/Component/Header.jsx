import HeaderSelect from "./HeaderSelect"
import pikachu from "../Image/pikachu.png"
function Header(){
    // State

    // Methode

    // Render
    return(
        <header>
            <div id="logoBox">
                <img src={pikachu} alt="" />
            </div>
            <HeaderSelect/>
        </header>
    )
}

export default Header