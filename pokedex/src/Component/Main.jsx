import MainSidebar from "./MainSidebar"
import MainContent from "./MainContent"
import { useContext, useEffect } from "react"
import { StateContext } from "../Context/StateContext"

function Main(){

    const {setPokemonsList} = useContext(StateContext)

    // Fonction qui récupère toute la liste des pokemons au chargement de la page
    useEffect(() => {
        const requestAPI = async () => {
            fetch(`https://pokebuildapi.fr/api/v1/pokemon`)
            .then(response => response.json())
            .then(pokemons => {
                pokemons.forEach(pokemon => {
                    pokemon.visible = false
                    pokemon.generationSelected = false
                })
                setPokemonsList(pokemons)
            })
        }

        requestAPI()
    }, [])

    return(
        <main>
            <MainSidebar />
            <MainContent />
        </main>
    )
}

export default Main