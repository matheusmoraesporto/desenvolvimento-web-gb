import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { firebaseData }  from '../../firebase/firebase-data';
import { IoGameController } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import './styles.css'
import Logo from '../../assets/logotypes/JMGames_White.png'
import { FcGoogle } from 'react-icons/fc'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ onReceiveGoogle, email, setEmail, password, setPassword, handleLogin, handleSignUp, emailError, passwordError, name, setName }) => {

    const actionLoginGoogle = async () => {
        let result = await firebaseData.googleLogin();

        if (result) {
            onReceiveGoogle(result.user);
        } else {
            alert('Error');
        }
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/register">
                    <div className="container-master">

                        <img src={Logo} alt="" />

                        <div className="signup-box">

                            <div className="create">
                                <a href="/homes"><BiArrowBack /></a>
                                <p id="create-account"> Crie sua conta</p>
                            </div>
                            <form action="submit" className="login-form">
                                <p>Nome:</p>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                <p>E-mail:</p>
                                <input type="text" value = {email} onChange={(e) => setEmail(e.target.value)} />
                                <p>Senha:</p>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </form>

                            <button onClick={() => handleSignUp()} className="button-config" id="enter">
                                <p id="text-button">C R E A T E</p>
                                <IoGameController />
                            </button>

                            <p id="account">Já possui uma conta? <a href="/" id="account">Faça login</a></p>
                        </div>

                    </div>
                </Route>
                <Route path="*">
                    <div className="container-master">

                        <img src={Logo} alt="" />

                        <div className="login-box">

                            <button className="button-config" id="google" onClick={actionLoginGoogle}>
                                <FcGoogle />
                                <p id="text-button">Entre com o Google</p>
                            </button>

                            <p id="or"> OU </p>

                            <form action="submit" className="login-form">

                                <p>E-mail:</p>
                                <input 
                                    type="text" 
                                    autoFocus
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 />
                                 <p>{emailError}</p>
                                 
                                <p>Senha:</p>
                                <input 
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p>{passwordError}</p>

                            </form>

                            <button onClick={() => handleLogin()} className="button-config" id="enter">
                                <p id="text-button">S T A R T</p>
                                <IoGameController />
                            </button>

                            <p id="account">Não possui uma conta? <a href="/register" id="account">Registre-se</a></p>

                        </div>

                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}