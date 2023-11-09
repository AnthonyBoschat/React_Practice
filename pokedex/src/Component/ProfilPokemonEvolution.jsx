import { useContext } from "react"
import { StateContext } from "../Context/StateContext"

function ProfilPokemonEvolution(){
    //////// STATE //////////
    const {fetchAllEvolutionOfThisPokemon, pokemonsList, profilPokemon, setProfilPokemon} = useContext(StateContext)

    //////// METHODE //////////
    const renderEvolution = (evolution) => {
        let classe = evolution.name === profilPokemon.name ? "nameEvolutionClickable currentEvolution" : "nameEvolutionClickable"
        return(<span key={`nameEvolution${evolution.name}`} data-name={evolution.name} onClick={changeCurrentPokemon} className={classe}>{evolution.name}</span>)
    }

    const changeCurrentPokemon = (event) => {
        const {name} = event.currentTarget.dataset
        const pokemonNeed = pokemonsList.filter(pokemon => pokemon.name === name)
        const nextPokemonToShow = pokemonNeed[0]
        nextPokemonToShow.tableauOfEvolution = fetchAllEvolutionOfThisPokemon(nextPokemonToShow.name)
        setProfilPokemon(nextPokemonToShow)
    }





    //////// RENDER //////////
    return(
        <span>{profilPokemon.tableauOfEvolution.map(evolution => renderEvolution(evolution))}</span>
    )
}

export default ProfilPokemonEvolution