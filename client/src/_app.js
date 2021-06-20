import React from 'react';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { Produtos } from './components/Produtos'
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import './global.css';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes';

function App() {
    const [user, setUser] = useState({
        id: 1,
        name: 'R'
    });

    if (user === null) {
        return (
            <Login />
        );

    } else {
        return (
            <BrowserRouter>
                <Header />
                <Banner />
                <Produtos />
                <Footer />
                <Routes />
            </BrowserRouter>
        );
    }


}

export default App;
