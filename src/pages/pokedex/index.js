import React, { useEffect } from 'react';
import { Creators } from "store/ducks"
import { PokemonPreview } from "components"
import { useSelector, useDispatch } from "react-redux";
import { Container, List } from "./styles"
//import { withRouter } from 'react-router-dom'

function Pokedex({ match, history }) {
    const { index } = match.params
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons.results)

    useEffect(() => {
        dispatch(Creators.fetchPokemons())
    }, [dispatch])

    if (!pokemons) return (
        <div>Loading</div>
    )

    const arr = [...pokemons.values()]
    return (
        <Container>
            <List>{arr.map(pokemon => {
                return <PokemonPreview
                    name={pokemon.name}
                    key={pokemon.id}
                    onClick={() => history.push(`/pokemon/${pokemon.name}`)}
                />
            })}</List>
        </Container>
        // <div>{pokemons.map(pokemon => <div>{pokemon.name}</div>)}</div>
    )

}

export default Pokedex //withRouter(Pokedex)