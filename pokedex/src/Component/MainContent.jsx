import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
import ProfilPokemon from "./ProfilPokemon"

function MainContent(){
    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible, profilPokemon, setProfilPokemon} = useContext(StateContext)

    // Methode
    const showProfilOfThisPokemon = (event) => {
        // On change le state profilPokemon pour indiquer que l'utilisateur veut voir le profil d'un pokemon
        // On setState toutes les informations du pokemons qui seront importante pour le profil, image, nom
        const pokemonName = event.target.dataset.pokemonname
        const pokemonImage = event.target.dataset.pokemonimage
        const pokemonType = event.target.dataset.pokemontype
        const copyProfilPokemon = {...profilPokemon}

        copyProfilPokemon.name = pokemonName
        copyProfilPokemon.img = pokemonImage
        copyProfilPokemon.type = pokemonType
        copyProfilPokemon.visible = true
        setProfilPokemon(copyProfilPokemon)
    }

    const generatePokemonList = (pokemon) => {
        if(pokemon.visible === true){
           const tableauDeType = pokemon.apiTypes.map((type) => type.name)
            const type = tableauDeType.join("")
            return(
                <div data-pokemonimage={pokemon.image} data-pokemontype={type} data-pokemonname={pokemon.name} onClick={showProfilOfThisPokemon} key={`keyCapsule_${pokemon.name}`} className={`capsulePokemonProfil ${type}`}>
                    <img data-pokemonimage={pokemon.image} data-pokemontype={type} data-pokemonname={pokemon.name} title={pokemon.name} src={pokemon.image} key={`keyImage_${pokemon.name}`} loading="lazy"></img>
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