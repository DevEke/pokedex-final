
import './pokemonlistitem.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonListItem({pokemon, handleSelectPokemon}) {
    const [pokeData, setPokeData] = useState(undefined)

    const getPokeData = (url) => {
        axios.get(`${url}`)
        .then(res => {
          setPokeData(res.data);
        }).catch(err => {
          console.error(err)
        })
      }

    useEffect(() => {
        getPokeData(pokemon.url);
      })

    return (
        <>
        {
                !pokeData ?
                <div className="loading_item-wrapper"/> :
                <div
                    className="item-wrapper"
                    onClick={() => handleSelectPokemon(pokeData)}>
                        <div className='item-header'>
                            <p className='item-id'>
                                {
                                 pokeData.id.toString().length === 1 ? `00` + pokeData.id :
                                 pokeData.id.toString().length === 2 ? `0` + pokeData.id :
                                 pokeData.id
                                 }:
                                </p>
                            <p className='item-name'>
                                {pokeData.name}
                            </p>
                        </div>
                        <div className='item-img'>
                            <img
                                src={pokeData?.sprites?.other['official-artwork'].front_default} 
                                className='img'
                                alt={`${pokeData.name}`}
                            />
                        </div>
                        
                </div>
        }
        </>
    )
}

export default PokemonListItem;