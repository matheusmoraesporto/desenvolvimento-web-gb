import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/api';
import copyImg from '../../assets/icons/copy.png';
import logOutImg from '../../assets/icons/log-out.png';
import okImg from '../../assets/icons/ok.png';
import './styles.css';

export function Finish({ user }) {
    const [orderSummary, setOrderSummary] = useState({});

    useEffect(() => {
        async function loadOrder() {
            const response = await api.get('/product/order', {
                params: {
                    idUser: user.id
                }
            });

            const { order } = response.data;

            setOrderSummary(order);
        };

        loadOrder();
    }, []);

    const copyBankSlip = () => {
        const inputBoleto = document.getElementById('input-boleto');

        inputBoleto.select();

        document.execCommand('copy');
    };

    return (
        <div className="card-conclusion">
            <div className="product-resume">
                <div className="resume">
                    <h3>Resumo do pedido</h3>
                    <p>Número do pedido: <span>{orderSummary.numOrder}</span></p>
                    <p>Valor do pedido: <span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderSummary.total)}</span></p>

                    <div className="buttons-boleto">
                        <br />
                        <input id="input-boleto" type="text" readOnly={true} value={orderSummary.bankSlip} />
                        <br />
                        <button id="btn-copy" className="btn cursor-pointer" onClick={() => copyBankSlip()}>
                            Copiar o código de barras do boleto <img src={copyImg} alt="Copiar" className="icon-20" />
                        </button>
                    </div>
                </div>
                <div className="conclusion">
                    <h3>Pedido conlcluído com sucesso!</h3>
                    <img src={okImg} alt="Sucesso" />
                </div>
            </div>

            <div className="payment">
                <p>O boleto de cobrança foi enviado para o seu e-mail.</p>

                <Link to="/">
                    <button type="submit" id="back" className="cursor-pointer btn">
                        Voltar ao início <img src={logOutImg} alt="Voltar" />
                    </button>
                </Link>
            </div>
        </div>
    );
}