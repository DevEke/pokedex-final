import normal from '../../assets/normal.svg';
import water from '../../assets/water.svg';
import electric from '../../assets/electric.svg';
import fighting from '../../assets/fighting.svg';
import ground from '../../assets/ground.svg';
import psychic from '../../assets/psychic.svg';
import rock from '../../assets/rock.svg';
import dark from '../../assets/dark.svg';
import steel from '../../assets/steel.svg';
import fire from '../../assets/fire.svg';
import grass from '../../assets/grass.svg';
import ice from '../../assets/ice.svg';
import poison from '../../assets/poison.svg';
import flying from '../../assets/flying.svg';
import bug from '../../assets/bug.svg';
import ghost from '../../assets/ghost.svg';
import dragon from '../../assets/dragon.svg';
import fairy from '../../assets/fairy.svg';
import './pokemonmodal.scss';
import { IoChevronUp, IoClose } from 'react-icons/io5';
import { useState, useEffect} from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';

export default function PokemonModal(props) {
    const { pokemon, clearCurrentPokemon } = props;
    const [ pokeData, setPokeData ] = useState(undefined);
    const [ specs, setSpecs] = useState(false);
    const [ baseStats, setBaseStats ] = useState(false);
    const [ abilities, setAbilities ] = useState(false);
    const [ moveSets, setMoveSets ] = useState(false);

    const getPokeData = (url) => {
        axios.get(`${url}`)
        .then(res => {
          setPokeData(res.data);
        }).catch(err => {
          console.error(err)
        })
    }

    useEffect(()=> {
        getPokeData(pokemon.species.url)
        return () => {

        }
    })

    return (
        <div className="modal-wrapper">
            <div className="modal-container" onClick={clearCurrentPokemon}/>
            <div className="modal-contents">
                {
                    pokemon && pokeData ?
                    <>
                    <div className='modal-header'>
                    <div className='modal-title'>
                        <p className='modal-id'>
                            {
                                pokemon.id.toString().length === 1 ? `00` + pokemon.id :
                                pokemon.id.toString().length === 2 ? `0` + pokemon.id :
                                pokemon.id
                            }:
                        </p>
                        <p className='modal-name'>
                            {pokemon.name}
                        </p>
                    </div>
                    <IoClose onClick={clearCurrentPokemon} className='close-icon'/>
                </div>
                <section className='modal-body'>
                    <div className='modal-pane'>
                        <div className='modal-img'>
                            <img
                                src={pokemon?.sprites?.other['official-artwork'].front_default} 
                                className='img'
                                alt={`${pokemon.name}`}
                            />
                        </div>
                        <div className='modal-data-item'>
                            <p className='modal-label'>Pokedex Entry</p>
                            <div className='modal-data'>
                                <p>{pokeData?.flavor_text_entries.find(x => x.language.name === 'en').flavor_text}</p>
                            </div>
                        </div>
                        <div className='modal-data-item'>
                            <p className='modal-label'>Types</p>
                            <div className='modal-data'>
                            {pokemon?.types?.map(type=> {
                                return (
                                    <div className="type-item">
                                        <img className="icon" src={
                                            type.type.name === 'normal' ? normal :
                                            type.type.name === 'water'?  water :
                                            type.type.name === 'electric'? electric:
                                            type.type.name === 'fighting'?  fighting:
                                            type.type.name === 'ground'?  ground:
                                            type.type.name === 'psychic'?  psychic:
                                            type.type.name === 'rock'?  rock:
                                            type.type.name === 'dark'?  dark:
                                            type.type.name === 'steel'?  steel:
                                            type.type.name === 'fire'? fire:
                                            type.type.name === 'grass'?  grass:
                                            type.type.name === 'ice'?  ice:
                                            type.type.name === 'poison'?  poison:
                                            type.type.name === 'flying'?  flying:
                                            type.type.name === 'bug'?  bug:
                                            type.type.name === 'ghost'?  ghost:
                                            type.type.name === 'fairy' ? fairy :
                                            dragon
                                        } alt={`${type.type.name}`}/>
                                        <p className='type-name'>{type.type.name}</p>
                                    </div>
                                )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='modal-window'>
                    <div className='modal-window_data-container'>
                                <div className='modal-window_data-header'>
                                    <p className='modal-window_data-title'>Specs</p>
                                    <IoChevronUp className={`chevron-icon ${specs ? '' : 'closed'}`} onClick={() => setSpecs(!specs)} />
                                </div>
                                {
                                    specs ?
                                    <div className='modal-window_data-contents'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className='table-label'>Height</td>
                                                    <td>{Math.floor(((pokemon.height / 0.1) * 0.393700787).toFixed(0)/12)} ft {((pokemon.height / 0.1) * 0.393700787).toFixed(0) % 12} in</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Weight</td>
                                                    <td className='table-data'>{Math.round((pokemon.weight / 10) * 2.2046) } lbs</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Shape</td>
                                                    <td className='table-data'>{pokeData.shape.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Base EXP</td>
                                                    <td className='table-data'>{pokemon.base_experience}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Base Happiness</td>
                                                    <td className='table-data'>{pokeData.base_happiness}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Color</td>
                                                    <td className='table-data'>{pokeData.color.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Capture Rate</td>
                                                    <td className='table-data'>{pokeData.capture_rate}%</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Growth Rate</td>
                                                    <td className='table-data'>{pokeData.growth_rate.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Habitat</td>
                                                    <td className='table-data'>{pokeData.habitat.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Baby</td>
                                                    <td className='table-data'>{pokeData.is_baby ? 'Yes' : 'No'}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Legendary</td>
                                                    <td className='table-data'>{pokeData.is_legendary ? 'Yes' : 'No'}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-label'>Mythical</td>
                                                    <td className='table-data'>{pokeData.is_mythical ? 'Yes' : 'No'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                     :
                                    null
                                }
                            </div>
                            <div className='modal-window_data-container'>
                                <div className='modal-window_data-header'>
                                    <p className='modal-window_data-title'>Base Stats</p>
                                    <IoChevronUp className={`chevron-icon ${specs ? '' : 'closed'}`} onClick={() => setBaseStats(!baseStats)} />
                                </div>
                                {
                                    baseStats ?
                                    <div className='modal-window_data-contents'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='table-label'>Stat</th>
                                                    <th className='table-label'>Attribute</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                 pokemon.stats.map((stat, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className='table-label'>{stat.stat.name}</td>
                                                            <td className='table-data'>{stat.base_stat}</td>
                                                        </tr>
                                                    )
                                                 })   
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                     :
                                    null
                                }
                            </div>
                            <div className='modal-window_data-container'>
                                <div className='modal-window_data-header'>
                                    <p className='modal-window_data-title'>Abilities</p>
                                    <IoChevronUp className={`chevron-icon ${specs ? '' : 'closed'}`} onClick={() => setAbilities(!abilities)} />
                                </div>
                                {
                                    abilities ?
                                    <div className='modal-window_data-contents'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='table-label'>Ability Name</th>
                                                    <th className='table-label'>Hidden Ability</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                pokemon.abilities.map((ability, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className='table-label'>{ability.ability.name}</td>
                                                            <td>{ability.is_hidden ? 'Yes' : 'No'}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                     :
                                    null
                                }
                            </div>
                            <div className='modal-window_data-container'>
                                <div className='modal-window_data-header'>
                                    <p className='modal-window_data-title'>Move Set</p>
                                    <IoChevronUp className={`chevron-icon ${specs ? '' : 'closed'}`} onClick={() => setMoveSets(!moveSets)} />
                                </div>
                                {
                                    moveSets ?
                                    <div className='modal-window_data-contents'>
                                        <table>
                                            
                                            <thead>
                                                <tr>
                                                    <th className='table-label'>Move Name</th>
                                                    <th className='table-label'>LVL</th>
                                                    <th className='table-label'>Learning Method</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                pokemon.moves.map((move, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className='table-data'>{move.move.name}</td>
                                                            <td className='table-data'>{move.version_group_details[0].level_learned_at}</td>
                                                            <td className='table-data'>{move.version_group_details[0].move_learn_method.name}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                     :
                                    null
                                }
                            </div>
                    </div>
                </section>
                </> :
                <div className='modal-loading-wrapper'>
                    <Loading/>
                </div>
                
                }
                
            </div>
        </div>
    )
}