import {lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import { IoSearch, IoClose } from 'react-icons/io5';
import PokemonListItem from './Components/PokemonListItem/PokemonListItem';
import PokemonModal from './Components/PokemonModal/PokemonModal';
import Loading from './Components/Loading/Loading';

const PokemonItem = lazy(() => import('./Components/PokemonListItem/PokemonListItem'));

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(undefined);
  const [query, setQuery] = useState('');

  const getPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=300')
    .then(res => {
      setPokemon(res.data.results)
    }).catch(err => {
      console.error(err)
    })
  }

  const handleSearch = (x) => {
    setQuery(x.target.value)
  }

  const handleSelectPokemon = (x) => {
    setCurrentPokemon(x)
  }

  const clearCurrentPokemon = () => {
    setCurrentPokemon(undefined)
  }

  let filteredPokemon = pokemon;
  const cased = query.toLowerCase();

  if (query !== '') {
      filteredPokemon = pokemon.filter(pokemon => pokemon.name.includes(cased))
  }

  useEffect(() => {
    getPokemon();
    return () => {

    }
  })


  return (
    <div className="app-wrapper">
      {
        currentPokemon ?
        <PokemonModal pokemon={currentPokemon} clearCurrentPokemon={clearCurrentPokemon}/> :
        null
      }
      <div className='app-container'>
        <header className='home-header'>
          <div className='content header-contents'>
          <h1 className="title">Pokedex</h1>
          <div className="search-wrapper">
              <IoSearch className='icon'/>
              <input value={query} onChange={handleSearch} />
              {
                query === '' ?
                null :
                  <IoClose onClick={() => setQuery('')} className='search-close-icon'/>
              }
          </div>
          </div>  
        </header>
        <main>
          <div className='content'>
          {
            pokemon.length === 0 ? 
            <div className='loading-wrapper'>
                <Loading/>
            </div> :
            <ul className='pokemon-list'>
              {
                filteredPokemon.map((item, i) => {
                  return (
                    <li key={i}>
                      <Suspense fallback={<div>Loading...</div>}>
                        <PokemonListItem handleSelectPokemon={(x) => handleSelectPokemon(x)} pokemon={item}/>
                      </Suspense>
                    </li>
                  )
                })
              }
            </ul>

          }
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
