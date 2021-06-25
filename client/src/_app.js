import React, { useState } from 'react';
import Login from './pages/login/login'
import './global.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import api from './components/service/api';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const actionLoginDataGoogle = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        }
        setUser(newUser);
    }

    if (user === null) {
        return (
            <Login onReceiveGoogle={actionLoginDataGoogle} />
        );
    }
    else {
        if (!authenticated) {
            api.post('user/auth', { user })
                .then(response => {
                    const { user } = response.data;

                    setUser(user);
                    setAuthenticated(true);
                });
        }

        return (
            <BrowserRouter>
                <Header user={user} />

                <Routes user={user} />

                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
