import React, { useEffect, useState } from 'react';
import Login from './pages/login/login'
import './global.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import api from './components/service/api';
import { firebaseApp } from './firebase/firebase-data';

function App() {
    const userCashed = localStorage['user'];
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        const retorno = await firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        break;
                }
            });

        if (retorno) {
            let newUser = {
                id: retorno.user.email,
                avatar: null
            }

            const retornoApi = await api.post('/user/auth', { user: newUser });

            const { user } = retornoApi.data;

            setUser(user);

            setAuthenticated(true);
        }
    };

    const handleSignUp = async () => {
        const retorno = await firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        break;
                }
            });

        if (retorno) {
            const model = {
                id: email,
                name: name,
                avatar: ''
            };

            await api.post('/user/auth', { user: model });

            alert('Usuário criado com sucesso! \nVolte para a tela de login para acessar o site.');
        }
    };

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
            <Login
                onReceiveGoogle={actionLoginDataGoogle}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignUp={handleSignUp}
                emailError={emailError}
                passwordError={passwordError}
                name={name}
                setName={setName}
            />
        );
    } else {
        if (!authenticated) {
            api.post('user/auth', { user })
                .then(response => {
                    setUser(response.data.user);

                    setAuthenticated(true);

                    localStorage.setItem('user', JSON.stringify(user));
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
