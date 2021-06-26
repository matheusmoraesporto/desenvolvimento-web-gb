import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import trashImg from '../../assets/icons/trash.svg';
import MarioEmptyCart from '../../assets/backgrounds/cart_empty.jpg';
import api from '../service/api';
import './styles.css';

export function Cart({ user }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProductsCart() {
            const response = await api.get('/product/cart', {
                params: {
                    idUser: user.id
                }
            });
            
            const { cartProducts } = response.data;
            
            setProducts(cartProducts || []);
        }

        loadProductsCart();
    }, []);

    return (
        <>
            {products.length <= 0
                ?
                (<div className="empty-cart-container">
                    <span className="spn-empty-cart">O carrinho está vazio! Volte a tela inicial e adicione um produto.</span>

                    <img src={MarioEmptyCart} alt="Carrinho vazio" />

                    <Link to="/">
                        <button type="submit" id="continue-buying" className="cursor-pointer btn">
                            Continue comprando
                        </button>
                    </Link>
                </div>)
                :
                (<div className="content-table">
                    <table>
                        <thead className="head-order">
                            <tr>
                                <th>Produto</th>
                                <th>Preço unitário</th>
                                <th>Quantidade</th>
                                <th>Subtotal</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-products">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="flex-row table-product filter-drop-shadow">
                                            <img className="img-order" src={product.img} alt={product.description} />

                                            <div>
                                                <p>{product.description}</p>
                                                <p>Cód: <span>{product.productCode}</span></p>
                                                <p>Estoque: <span>Disponível</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">R$ {product.value}</td>
                                    <td className="font-bold">{product.quantity}</td>
                                    <td className="font-bold">R$ {product.value * product.quantity}</td>
                                    <td>
                                        <img className="icon-20 cursor-pointer delete" src={trashImg} alt="Remover item do carrinho" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)
            }
        </>
    );
}