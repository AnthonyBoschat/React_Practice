import { useContext } from "react"
import { StateContext } from "../Context/StateContext"

function ProfilPokemonName({pokemon}){
    const {fetchAllEvolutionOfThisPokemon, pokemonsList, profilPokemon, setProfilPokemon} = useContext(StateContext)

    const renderEvolution = (evolution) => {
        let classe = null
        if(evolution.name === pokemon.name){classe = "nameEvolutionClickable currentEvolution"}
        else{classe = "nameEvolutionClickable"}

        return(<span key={`nameEvolution${evolution.name}`} data-name={evolution.name} onClick={changeCurrentPokemon} className={classe}>{evolution.name}</span>)
    }

    const changeCurrentPokemon = (event) => {
        const {name} = event.currentTarget.dataset
        const pokemonNeed = pokemonsList.filter(pokemon => pokemon.name === name)
        const pokemonNeedName = pokemonNeed[0].name
        const pokemonNeedImage = pokemonNeed[0].image
        const pokemonNeedType = pokemonNeed[0].typeJoin


        const copyProfilPokemon = {...profilPokemon}
        copyProfilPokemon.name = pokemonNeedName
        copyProfilPokemon.img = pokemonNeedImage
        copyProfilPokemon.type = pokemonNeedType
        copyProfilPokemon.tableauOfEvolution = fetchAllEvolutionOfThisPokemon(pokemonNeedName)
        setProfilPokemon(copyProfilPokemon)
    }
    
    return(
        <span>{pokemon.tableauOfEvolution.map(evolution => renderEvolution(evolution))}</span>
    )
}

export default ProfilPokemonName