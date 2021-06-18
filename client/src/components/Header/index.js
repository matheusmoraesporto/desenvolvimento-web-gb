import searchIcon from '../../assets/icons/search.png';

import logoImg from '../../assets/logotypes/JMGames_White.png';

import pacmanIcon from '../../assets/icons/pacman.png';

import cartIcon from '../../assets/icons/cart.png';

import './styles.css';

export function Header() {
    return (
        <header className="flex-row">
            <img src={logoImg} alt="JM Games" className="logo cursor-pointer" />

            <div className="flex-row div-search">
                <input type="text" name="search" id="search" placeholder="Pesquisar" />

                <button type="submit" className="find cursor-pointer">
                    <img src={searchIcon} alt="Pesquisar" className="item-header" />
                </button>
            </div>

            <div className="user flex-row">
                <img src={pacmanIcon} alt="Usuário" className="item-header" />
                <div>
                    <p>Bem vindo(a)</p>
                    <p>AQUI VAI TER QUE SER O NOME DO USUÁRIO LOGADO</p>
                </div>
            </div>

            <button id="btn-cart" className="cart cursor-pointer flex-row">
                <img src={cartIcon} alt="Carrinho" className="item-header" />
                <span id="cart-length" hidden></span>
            </button>
        </header>
    );
}