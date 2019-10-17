import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import Store from "store"
import * as Page from "./pages"

export default () => (
    <Provider store={Store}>
        <Router>
            <Switch>
                <Route path="/" component={Page.Pokedex} />
            </Switch>
        </Router>
    </Provider>
)