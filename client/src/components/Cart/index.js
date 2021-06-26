import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/api';
import boletoImg from '../../assets/icons/boleto.png';
import cashImg from '../../assets/icons/cash.png';
import locationImg from '../../assets/icons/location.png';
import MarioEmptyCart from '../../assets/backgrounds/emptycart.jpg';
import protectedImg from '../../assets/logotypes/protected.png';
import trashImg from '../../assets/icons/trash.svg';
import './styles.css';

export function Cart({ user }) {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        async function loadProductsCart() {
            const response = await api.get('/product/cart', {
                params: {
                    idUser: user.id
                }
            });

            const { products } = response.data;

            setProducts(products || []);

            let totalProducts = 0;

            products.forEach(o => totalProducts += (o.value * o.quantity));

            setTotal(totalProducts);
        }

        loadProductsCart();
    }, []);

    const removeItem = async (id) => {
        const response = await api.post('/product/remove', {
            params: {
                idProduct: id,
                idUser: user.id
            }
        });

        const { products } = response.data;

        setProducts(products);
    };

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
                                        <img
                                            className="icon-20 cursor-pointer delete"
                                            src={trashImg}
                                            alt="Remover item do carrinho"
                                            onClick={() => removeItem(product.idProduct)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total">
                        Total: <span id="spn-total">R$ {total}</span>
                    </div>

                    <div className="flex-row forms">
                        <div className="forms-detail form-address filter-drop-shadow">
                            <div className="flex-row forms-detail-head">
                                <img src={locationImg} className="icon-20" />
                                <h4>Entrega</h4>
                            </div>

                            <div className="div-input-form">
                                <label for="cep">CEP:</label>
                                <input className="input-form" type="text" name="cep" id="cep" placeholder="xxxxx-xxx" />
                            </div>

                            <div className="div-input-form">
                                <label for="address">Endereço:</label>
                                <input className="input-form" type="text" name="address" id="address" disabled={true} />
                            </div>

                            <div className="flex-row div-input-form">
                                <div className="input-50">
                                    <label for="number">Número:</label>
                                    <input className="input-form input-form-margin-right" type="number" name="number" id="number" min="1" disabled={true} />
                                </div>

                                <div className="input-50 div-input-form">
                                    <label for="complement">Complemento:</label>
                                    <input className="input-form" type="text" name="complement" id="complement" disabled={true} />
                                </div>
                            </div>

                            <div className="flex-row div-input-form">
                                <div className="input-50">
                                    <label for="uf">UF:</label>
                                    <input className="input-form input-form-margin-right" type="text" name="uf" id="uf" disabled={true} />
                                </div>

                                <div className="input-50">
                                    <label for="city">Cidade:</label>
                                    <input className="input-form" type="text" name="city" id="city" disabled={true} />
                                </div>
                            </div>
                        </div>

                        <div className="forms-detail form-payment filter-drop-shadow">
                            <div className="flex-row forms-detail-head">
                                <img src={cashImg} className="icon-20" />
                                <h4>Pagamento</h4>
                            </div>

                            <div className="form-payment-bank-slip">
                                <div className="flex-row payment-bank-slip">
                                    <img src={boletoImg} className="icon-20" />
                                    <p>via boleto bancário</p>
                                </div>

                                <div className="payment-bank-slip-detail flex-row">
                                    <img id="protected" src={protectedImg} />
                                    <p>Total: <span id="spn-payment-bank-slip-detail">R$ {total}</span></p>
                                </div>

                                <p>Compensação em até 2 dias úteis</p>
                            </div>

                            <div>
                                <button type="submit" id="continue-buying" className="continue-buying cursor-pointer">Continuar comprando</button>
                                <button type="submit" id="finish" className="cursor-pointer btn">Finalizar a compra</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
}