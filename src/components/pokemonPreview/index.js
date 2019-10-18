import React, { useEffect } from 'react';
import { Creators } from "store/ducks"
import { useSelector, useDispatch } from "react-redux";
import { Container } from './styles';
//import Shimmer from "react-shimmer-effect";
import ReactLoading from 'react-loading';

export default function PokemonPreview(props) {
    const { name } = props

    const dispatch = useDispatch()
    const Pokemons = useSelector(state => state.pokemons.results)

    const Pokemon = JSON.parse(localStorage.getItem(name)) || Pokemons.get(name)

    console.log(name === "kakuna matata")

    const { url, loading } = Pokemon

    useEffect(() => {
        if (url && loading) dispatch(Creators.fetchPokemon(name))
    }, [dispatch, loading, name, url])

    if (loading) return (
        <Container {...props}>
            <ReactLoading type="spin" color="blue" />
        </Container>
    )

    const { sprites, id } = Pokemon

    return (
        <Container {...props}>
            <img src={sprites.front_shiny} alt={name} />
            <div>{name}</div>
            <div>id: {id}</div>

        </Container>
    );
}
