import searchIcon from '../../assets/icons/search.png';
import logoImg from '../../assets/logotypes/JMGames_White.png';
import cartIcon from '../../assets/icons/cart.png';
import profile_icon from '../../assets/icons/sonic.png';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';
import './styles.css';

export function Header(props) {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.go(0)
    };
    
    return (
        <header className="flex-row">
            <Link to="/">
                <img src={logoImg} alt="JM Games" className="logo cursor-pointer" />
            </Link>

            <div className="flex-row div-search">
                <input type="text" name="search" id="search" placeholder="Pesquisar" />

                <button type="submit" className="find cursor-pointer">
                    <img src={searchIcon} alt="Pesquisar" className="item-header" />
                </button>
            </div>

            <div className="user flex-row">
                <img id="avatar" src={props.user.avatar || profile_icon} alt="Usuário" className="item-header" />
                <div>
                    <p>Bem vindo(a) ,</p>
                    <p>{props.user.name}</p>
                </div>
            </div>

            <Link to="/cart">
                <button id="btn-cart" className="cart cursor-pointer flex-row">
                    <img src={cartIcon} alt="Carrinho" className="item-header" />
                    <span id="cart-length" hidden></span>
                </button>
            </Link>
            
            <button onClick={()=> logout()} id="btn-cart" className="cart cursor-pointer flex-row">
                <RiLogoutCircleLine className="logout" />
            </button>
        </header>
    );
}