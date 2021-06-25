import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/home';
import { CartPage } from './pages/cart/cart';
import { OrderConclusion } from './pages/order-conclusion/order-conclusion'

function Routes({ user }) {
    return (
        <Switch>
            <Route exact path="/">
                <Home user={user} />
            </Route>
            <Route exact path="/cart">
                <CartPage user={user} />
            </Route>
            <Route exact path="/order-conclusion">
                <OrderConclusion user={user} />
            </Route>
        </Switch>
    )
}

export default Routes;