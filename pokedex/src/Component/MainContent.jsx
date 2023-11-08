import React, { useContext, useEffect, useState } from "react"
import PokemonLogo from "../Image/pokemonLogo.png"
import { StateContext } from "../Context/StateContext"
import ProfilPokemon from "./ProfilPokemon"

function MainContent(){
    // State et Context
    const {pokemonsList, setPokemonsList, logoVisible, setLogoVisible, profilPokemon, setProfilPokemon} = useContext(StateContext)

    // Methode
    const showProfilOfThisPokemon = (event) => {

        const fetchAllEvolutionOfThisPokemon = (pokemonName) => {
            let currentPokemonAnalys = pokemonName
            let controle = true
            let firstPokemonFind = false
            const copyPokemonsList = [...pokemonsList]
            const tableauOfEvolution = []
            while(controle){
                copyPokemonsList.map((pokemon) => {
                    if(pokemon.name === currentPokemonAnalys){
                        // Cible les pokemons sans évolution et retro evolution
                        if(pokemon.apiPreEvolution === "none" && pokemon.apiEvolutions.length === 0){
                            tableauOfEvolution.push(pokemon.name)
                            controle = false
                        }
                        // Si le pokemon a une rétro évolution et qu'on a pas trouver le premier encore, on descend
                        else if(pokemon.apiPreEvolution != "none" && firstPokemonFind === false){
                            currentPokemonAnalys = pokemon.apiPreEvolution.name
                        }
                        // Si le pokemon n'a pas de rétro évolution, et qu'il a une évolution, on a toruver le premier pokemon des evolutions, on monte
                        else if(pokemon.apiPreEvolution === "none" && pokemon.apiEvolutions.length != 0){
                            firstPokemonFind = true
                            tableauOfEvolution.push(pokemon.name)
                            currentPokemonAnalys = pokemon.apiEvolutions[0].name
                        }
                        // Si le pokemon a une retro evolution, qu'on a déjà trouver le premier pokemon et qu'il y a encore une évolution, on monte
                        else if(pokemon.apiPreEvolution != "none" && firstPokemonFind === true && pokemon.apiEvolutions.length != 0){
                            tableauOfEvolution.push(pokemon.name)
                            currentPokemonAnalys = pokemon.apiEvolutions[0].name
                        }
                        // Si le pokemon a une retro evolution, que le premier pokemon a été trouver, et qu'il n'a plus d'évolution futur, on s'arrête
                        else if(pokemon.apiPreEvolution != "none" && firstPokemonFind === true && pokemon.apiEvolutions.length === 0){
                            tableauOfEvolution.push(pokemon.name)
                            controle = false
                        }
                    }
                })
            }
            return tableauOfEvolution
        }

        // On change le state profilPokemon pour indiquer que l'utilisateur veut voir le profil d'un pokemon
        // On setState toutes les informations du pokemons qui seront importante pour le profil, image, nom
        const {name, image, type} = event.currentTarget.dataset
        const pokemonName = name
        const pokemonImage = image
        const pokemonType = type
        const copyProfilPokemon = {...profilPokemon}

        copyProfilPokemon.name = pokemonName
        copyProfilPokemon.img = pokemonImage
        copyProfilPokemon.type = pokemonType
        copyProfilPokemon.visible = true
        copyProfilPokemon.tableauOfEvolution = fetchAllEvolutionOfThisPokemon(pokemonName)
        setProfilPokemon(copyProfilPokemon)
        console.log(copyProfilPokemon)

        
    }

    const generatePokemonList = (pokemon) => {
        if(pokemon.visible === true){
            const tableauDeType = pokemon.apiTypes.map((type) => type.name)
            const type = tableauDeType.join("")
            return(
                <div data-image={pokemon.image} data-type={type} data-name={pokemon.name} onClick={showProfilOfThisPokemon} key={`keyCapsule_${pokemon.name}`} className={`capsulePokemonProfil ${type}`}>
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