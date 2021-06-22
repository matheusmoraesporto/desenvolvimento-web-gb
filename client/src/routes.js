import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { EmptyCart } from './pages/empty-cart/empty-cart'
import { OrderConclusion } from './pages/order-conclusion/order-conclusion'

function Routes(){
    return(
        <Switch>

            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/cart">
                <Cart />
            </Route>
            <Route exact path="/empty-cart">
                <EmptyCart />
            </Route>
            <Route exact path="/order-conclusion">
                <OrderConclusion />
            </Route>
        </Switch>
    )
}

export default Routes;