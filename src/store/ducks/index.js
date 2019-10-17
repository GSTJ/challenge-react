import { createReducer, createActions } from 'reduxsauce'

const INITIAL_STATE = {
    pokemons: []
}

export const { Types, Creators } = createActions({
    fetchPokemons: [],
    recievedPokemons: ['pokemons']
}, {})


const FetchPokemons = (state = INITIAL_STATE, action) => {
    return { ...state, loading: true }
}

const RecievedPokemons = (state = INITIAL_STATE, action) => {
    return { ...state, ...action }
}

const HANDLERS = {
    [Types.FETCH_POKEMONS]: FetchPokemons,
    [Types.RECIEVED_POKEMONS]: RecievedPokemons,
}

export default createReducer(INITIAL_STATE, HANDLERS)