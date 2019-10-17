import { call, put, takeLatest } from 'redux-saga/effects'
import { Types, Creators } from "store/ducks"
import Api from "api"

function* fetchPokemons() {
    try {
        const pokemons = yield call(Api.get, "pokemon")
        yield put(Creators.recievedPokemons(pokemons.data.results));
    } catch (e) {
        // Fix later
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

function* mySaga() {
    yield takeLatest(Types.FETCH_POKEMONS, fetchPokemons);
}

export default mySaga;