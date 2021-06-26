import React, { useEffect, useState } from 'react';
import Login from './pages/login/login'
import './global.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import api from './components/service/api';

function App() {
    const userCashed = localStorage['user'];
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const actionLoginDataGoogle = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        }

        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    }
    
    useEffect(() => {
        if (userCashed) {
            setUser(JSON.parse(userCashed));
        }
    }, []);

    if (!user) {
        return (
            <Login onReceiveGoogle={actionLoginDataGoogle}/>
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
                <Routes user={user} />
            </BrowserRouter>
        );
    }
}

export default App;
