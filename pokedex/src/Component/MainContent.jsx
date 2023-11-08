import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
import ProfilPokemon from "./ProfilPokemon"

function MainContent(){
    // State et Context
    const {fetchAllEvolutionOfThisPokemon, pokemonsList, setPokemonsList, logoVisible, setLogoVisible, profilPokemon, setProfilPokemon} = useContext(StateContext)

    // Methode
    const showProfilOfThisPokemon = (event) => {
        // On change le state profilPokemon pour indiquer que l'utilisateur veut voir le profil d'un pokemon
        // On setState toutes les informations du pokemons qui seront importante pour le profil, image, nom
        const {name, image, type} = event.currentTarget.dataset

        const tableaupokemonStats = pokemonsList.filter(pokemon => {
            return(pokemon.name === name)
        }).map(element => (element.stats))

        const pokemonStats = tableaupokemonStats[0]
        const pokemonName = name
        const pokemonImage = image
        const pokemonType = type
        const copyProfilPokemon = {...profilPokemon}

        copyProfilPokemon.name = pokemonName
        copyProfilPokemon.img = pokemonImage
        copyProfilPokemon.type = pokemonType
        copyProfilPokemon.visible = true
        copyProfilPokemon.tableauOfEvolution = fetchAllEvolutionOfThisPokemon(pokemonName)
        copyProfilPokemon.stats = pokemonStats
        setProfilPokemon(copyProfilPokemon)
    }

    const generatePokemonList = (pokemon) => {
        if(pokemon.visible === true){
            return(
                <div data-image={pokemon.image} data-type={pokemon.typeJoin} data-name={pokemon.name} onClick={showProfilOfThisPokemon} key={`keyCapsule_${pokemon.name}`} className={`capsulePokemonProfil ${pokemon.typeJoin}`}>
                    <img title={pokemon.name} src={pokemon.image} key={`keyImage_${pokemon.name}`} loading="lazy"></img>
                </div>
            ) 
        }
    }

    // Render
    return(
        <div id="mainContentBox">
            {logoVisible && <div id="logoPokemonBox"><img src={PokemonLogo}></img></div>}
            {!logoVisible && <div id="pokemonsListBox">{pokemonsList.map((pokemon) => generatePokemonList(pokemon))}</div>}
            <ProfilPokemon />
        </div>
    )
}

export default MainContent