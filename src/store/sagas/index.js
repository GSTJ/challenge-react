import { call, put, takeEvery, select } from 'redux-saga/effects'
import { Types, Creators } from "store/ducks"
import Api from "api"

function* fetchPokemons({ direction }) {
    try {
        const { next, previous } = yield select(state => state.pokemons)

        var pokemons = {}
        switch (direction) {
            case "next": pokemons = yield call(Api.get, next); break;
            // case "previous": pokemons = yield call(Api.get, previous); break;
            default: pokemons = yield call(Api.get, "pokemon");
        }

        yield put(Creators.recievedPokemons(pokemons.data));
    } catch (e) {
        // Fix later
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

function* fetchPokemon({ name, url }) {
    try {
        const Pokemon = yield call(Api.get, `pokemon/${name}`)
        yield put(Creators.recievedPokemon(name, Pokemon.data));
    } catch (e) {
        // Fix later
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

export default function* rootSaga() {
    yield takeEvery(Types.FETCH_POKEMONS, fetchPokemons);
    yield takeEvery(Types.FETCH_POKEMON, fetchPokemon);
}
