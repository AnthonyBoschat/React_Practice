import MainSidebar from "./MainSidebar"
import MainContent from "./MainContent"
import { useContext, useEffect } from "react"
import { StateContext } from "../Context/StateContext"

function Main(){

    ////////// STATE ///////////
    const {setPokemonsList} = useContext(StateContext)

    ////////// METHODE /////////////
    // Fonction qui récupère toute la liste des pokemons au chargement de la page
    useEffect(() => {
        const localStorageInformation = JSON.parse(localStorage.getItem("pokemons"))
        let controle =  false
        const requestAPI = () => {
            fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
            .then(response => response.json())
            .then(pokemons => {
                if(!controle){
                    pokemons.forEach(pokemon => {
                    pokemon.visible = false
                    pokemon.generationSelected = false
                    const tableauDeType = pokemon.apiTypes.map((type) => type.name)
                    const type = tableauDeType.join("")
                    pokemon.typeJoin = type
                })
                setPokemonsList(pokemons)
                // On stock dans localStorage la liste des pokemons
                localStorage.setItem("pokemons", JSON.stringify(pokemons))
                }
            })
        }

        if(localStorageInformation){setPokemonsList(localStorageInformation)}
        else{requestAPI()}
        

        return () => {
            controle = true
        }
    }, [])








    ////////// RENDER ////////////
    return(
        <main>
            <MainSidebar />
            <MainContent />
        </main>
    )
}

export default Main