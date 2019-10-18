import { createReducer, createActions } from 'reduxsauce'

const INITIAL_STATE = {
    pokemons: {
        results: new Map()
    }
}

export const { Types, Creators } = createActions({
    fetchPokemon: ['name'],
    recievedPokemon: ['name', 'info'],
    fetchPokemons: ['direction'],
    recievedPokemons: ['pokemons']
}, {})

const FetchPokemon = (state = INITIAL_STATE, { name }) => {
    const Pokemons = new Map(state.pokemons.results)
    const Pokemon = Pokemons.get(name)

    Pokemons.set(name, { ...Pokemon, loading: true })

    return { ...state, pokemons: { ...state.pokemons, results: Pokemons } }
}

const RecievedPokemon = (state = INITIAL_STATE, { name, info }) => {
    const Pokemons = new Map(state.pokemons.results)

    Pokemons.set(name, { ...info, loading: false })

    return { ...state, pokemons: { ...state.pokemons, results: Pokemons } }
}

const FetchPokemons = (state = INITIAL_STATE) => {
    return { ...state, pokemons: { ...state.pokemons, loading: true } }
}

const RecievedPokemons = (state = INITIAL_STATE, { pokemons }) => {
    const newResults = new Map(state.pokemons.results)

    pokemons.results.forEach(pokemon => {
        newResults.set(pokemon.name, { ...pokemon, loading: true })
    })

    Object.entries(localStorage).map(entry => {
        console.log(entry[0])
        newResults.set(entry[0], JSON.parse(entry[1]))
    })

    console.log(newResults)

    return { ...state, pokemons: { ...pokemons, results: newResults, loading: false } }
}

const HANDLERS = {
    [Types.FETCH_POKEMON]: FetchPokemon,
    [Types.RECIEVED_POKEMON]: RecievedPokemon,
    [Types.FETCH_POKEMONS]: FetchPokemons,
    [Types.RECIEVED_POKEMONS]: RecievedPokemons,
}

export default createReducer(INITIAL_STATE, HANDLERS)