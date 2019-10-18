import React, { useEffect } from 'react';
import { Creators } from "store/ducks"
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from 'react-loading';

export default function Pokemon(props) {
    const { name } = props.match.params

    const Pokemons = useSelector(state => state.pokemons.results)
    const Pokemon = JSON.parse(localStorage.getItem(name)) || Pokemons.get(name)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!Pokemon || Pokemon.loading) dispatch(Creators.fetchPokemon(name))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!Pokemon || Pokemon.loading) return (
        <ReactLoading type="spin" color="blue" />
    )
    const PokemonSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Muito longo!')
            .required('Required')
    })

    return (
        <div>
            <img src={Pokemon.sprites.front_shiny} alt={name} />

            <Formik
                initialValues={Pokemon}

                onSubmit={values => localStorage.setItem(values.name, JSON.stringify(values))}
            >
                <Form>
                    <h2>Nome: </h2>
                    {Pokemon.name}

                    <h2>Tipos:</h2>
                    {Pokemon.types.map((type, i) => (
                        <>
                            <Field name={`types[${i}].type.name`} />
                            <br />
                        </>
                    ))}

                    <h2>Atributos:</h2>
                    {Pokemon.stats.map((type, i) => (
                        <>
                            <Field name={`stats[${i}].stat.name`} />
                            <Field name={`stats[${i}].base_stat`} />
                            <br />
                        </>
                    ))}

                    <button type="submit">Save</button>
                </Form>
            </Formik>
        </div >
    )
}
