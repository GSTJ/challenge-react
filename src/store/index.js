import { createStore, applyMiddleware } from 'redux'
import Reducers from "./ducks"
import Saga from "./sagas"

import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
export default createStore(Reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Saga)