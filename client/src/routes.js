import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Produtos } from './components/Produtos';
import { Banner } from './components/Banner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { OrderConclusion } from './pages/order-conclusion/order-conclusion'

function Routes({ user }) {
    return (
        <Switch>
            <Route exact path="/">
                <Header user={user} />
                <Banner />
                <Produtos user={user} />
                <Footer />
            </Route>
            <Route exact path="/cart">
                <Header user={user} />
                <Cart user={user} />
                <Footer />
            </Route>
            <Route exact path="/order-conclusion">
                <Header user={user} />
                <OrderConclusion user={user} />
                <Footer />
            </Route>
        </Switch>
    )
}

export default Routes;