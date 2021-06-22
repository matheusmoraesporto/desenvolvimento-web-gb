import React, { useState } from 'react';
import Login from './pages/login/login'
import './global.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {

    const [user, setUser] = useState(null);
    

    const actionLoginDataGoogle = async (u) =>{
        let newUser ={
           id: u.uid,
           name: u.displayName,
           avatar: u.photoURL
        }
        setUser(newUser);
    }

    if (user === null) {
        return (
           <Login onReceiveGoogle={actionLoginDataGoogle}/>
        );

    } else {
        return (
            <BrowserRouter>
                <Header user={user} />

                <Routes />

                <Footer />
            </BrowserRouter>
        );
    }


}

export default App;
