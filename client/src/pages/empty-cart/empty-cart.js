import React from 'react';
import MarioEmptyCart from '../../assets/backgrounds/emptycart.jpg'
import './styles.css'

export function EmptyCart(){

    return(
        <div className="empty-cart-container">
        <span class="spn-empty-cart">O carrinho está vazio! Volte a tela inicial e adicione um produto.</span>
        
        <img src={MarioEmptyCart} alt="" />

        <button type="submit" id="continue-buying" class="cursor-pointer btn">
        Continue comprando
        </button>
        </div>
    );
}

