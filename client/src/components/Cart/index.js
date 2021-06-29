import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../service/api';
import apiCep from '../service/api-cep';
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

    // Campos do form
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');

    const history = useHistory();

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

    const getCep = async (cep) => {
        if (cep) {
            const response = await apiCep.get(`/${cep}/json/`);
            const { data } = response;

            if (!data.erro) {
                const {
                    bairro,
                    complemento,
                    localidade,
                    logradouro,
                    uf
                } = data;

                setBairro(bairro);
                setCidade(localidade);
                setComplemento(complemento);
                setEndereco(logradouro);
                setUf(uf);
            }
            else {
                resetFieldsAddress();
            }
        }
    };

    const resetFieldsAddress = () => {
        setBairro('');
        setCidade('');
        setComplemento('');
        setEndereco('');
        setBairro('');
        setUf('');
    };

    const changeCep = (cep) => {
        if (cep) {
            // Obtém somente os números, para obter a quantidade máxima que pode ser informada
            const cepOnlyNumber = cep.replace(/[^\d]+/g, '').slice(0, 8);
            cep = cepOnlyNumber.match(/.{1,5}/g).join("-");
        }

        if (cep.length <= 0) {
            resetFieldsAddress();
        }

        setCep(cep);
    };

    const finish = async () => {
        const response = await api.post('/product/finish', {
            params: {
                idUser: user.id,
                total
            }
        });

        const { status } = response;

        if (status === 200) {
            history.push('/finish');
        }
        else {
            const { error } = response.data;

            alert(error);
        }
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

                            <div className="flex-row div-input-form">
                                <div className="input-90">
                                    <label htmlFor="cep">CEP:</label>
                                    <input
                                        className="input-form input-form-margin-right"
                                        type="text"
                                        name="cep"
                                        id="cep"
                                        placeholder="xxxxx-xxx"
                                        value={cep}
                                        onChange={(e) => changeCep(e.target.value)} />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        onClick={() => getCep(cep)}
                                        className="btn btn-buscar-cep cursor-pointer">
                                        Buscar
                                    </button>
                                </div>
                            </div>

                            <div className="div-input-form">
                                <label htmlFor="address">Endereço:</label>
                                <input
                                    className="input-form"
                                    type="text"
                                    name="address"
                                    id="address"
                                    disabled={true}
                                    value={endereco}
                                />
                            </div>

                            <div className="flex-row div-input-form">
                                <div className="input-50">
                                    <label htmlFor="bairro">Bairro:</label>
                                    <input
                                        className="input-form input-form-margin-right"
                                        type="text"
                                        name="bairro"
                                        id="bairro"
                                        min="1"
                                        disabled={true}
                                        value={bairro}
                                    />
                                </div>

                                <div className="input-50 div-input-form">
                                    <label htmlFor="complement">Complemento:</label>
                                    <input
                                        className="input-form"
                                        type="text"
                                        name="complement"
                                        id="complement"
                                        disabled={true}
                                        value={complemento}
                                    />
                                </div>
                            </div>

                            <div className="flex-row div-input-form">
                                <div className="input-50">
                                    <label htmlFor="uf">UF:</label>
                                    <input
                                        className="input-form input-form-margin-right"
                                        type="text"
                                        name="uf"
                                        id="uf"
                                        disabled={true}
                                        value={uf}
                                    />
                                </div>

                                <div className="input-50">
                                    <label htmlFor="city">Cidade:</label>
                                    <input
                                        className="input-form"
                                        type="text"
                                        name="city"
                                        id="city"
                                        disabled={true}
                                        value={cidade}
                                    />
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
                                <Link to="/">
                                    <button type="submit" id="continue-buying" className="continue-buying cursor-pointer">Continuar comprando</button>
                                </Link>
                                <button onClick={() => finish()} disabled={endereco.length <= 0} type="submit" id="finish" className="cursor-pointer btn">Finalizar a compra</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    );
}