import React from 'react';
import { Creators } from "store/ducks"
import { useSelector, useDispatch } from "react-redux";

export default () => {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)

    dispatch(Creators.fetchPokemons())

    if (!pokemons) return (
        <div>Loading</div>
    )
    return (
        <div>{pokemons.map(pokemon => <div>{pokemon.name}</div>)}</div>
    )

}