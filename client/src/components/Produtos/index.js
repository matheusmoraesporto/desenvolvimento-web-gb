import roundedUp from '../../assets/icons/rounded-up.svg';
import React, { useState, useEffect } from 'react';
import api from '../service/api';
import filters from './mock';
import './styles.css';

export function Produtos() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/product/list');

            setProducts(response.data.products);
        }

        loadProducts();
    }, []);

    const addProduct = async function (product){
        const { id, description, img, value, branch, type, productCode } = product;

        const newProduct = {
            id,
            description,
            img,
            value,
            branch,
            type,
            productCode,
            login: 'userdefault' //TODO
        };

        const newCart = await api.post('/cart/add', newProduct);

        setCart(newCart);
    }

    return (
        <div className="main">
            <div className="filtros">
                {filters.map(filt => (
                    <div key={filt.type}>
                        <h4>{filt.type}</h4>
                        {filt.filtersDetail.map(filDetail => (
                            <div className="flex-row" key={filDetail.id}>
                                <input type="checkbox" name={filDetail.type} id={filDetail.type} className="filters-type-product" />
                                <label htmlFor={filDetail.type}>{filDetail.description}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <ul className="products flex-wrap">
                {products.map(product => (
                    <li key={product.id} className="card-products filter-drop-shadow">
                        <img src={product.img} alt={product.description} className="products-images" />

                        <div className="description">
                            <p className="products-description">{product.description}</p>
                        </div>

                        <p className="products-value">R$ {product.value}</p>

                        <div className="cart-button">
                            <button className="cursor-pointer add-product btn" onClick={() => addProduct(product)}>Adicionar ao carrinho</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                id="gotop"
                className="cursor-pointer"
                title="Voltar para o topo da página"
                onClick={() => {
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }}>
                <img src={roundedUp} className="icon-20" alt="Voltar para o topo da página" />
            </button>
        </div>
    );
}