import React, { useEffect, useState } from 'react';
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

            const { products } = response.data;

            setProducts(products);
        }

        loadProductsCart();
    }, []);

    return (
        <>
            {products.length <= 0
                ?
                (<div className="empty-cart-container">
                    <span class="spn-empty-cart">O carrinho está vazio! Volte a tela inicial e adicione um produto.</span>

                    <img src={MarioEmptyCart} alt="Carrinho vazio" />

                    <button type="submit" id="continue-buying" class="cursor-pointer btn">
                        Continue comprando
                    </button>
                </div>)
                :
                (<div class="content-table">
                    <table>
                        <thead class="head-order">
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
                                    <td className="font-bold">
                                        <div className="flex-row justify-content-center">
                                            <button class="cursor-pointer bkg-light-blue btn-decrement">-</button>
                                            <p className="bkg-light-blue">{product.quantity}</p>
                                            <button className="cursor-pointer bkg-light-blue btn-increment">+</button>
                                        </div>
                                    </td>
                                    <td className="font-bold">R$ {product.value * product.quantity}</td>
                                    <td>
                                        <img className="icon-20 cursor-pointer delete" src={trashImg} />
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