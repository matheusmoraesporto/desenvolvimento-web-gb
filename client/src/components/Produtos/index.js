import roundedUp from '../../assets/icons/rounded-up.svg';
import React, { useState, useEffect } from 'react';
import api from '../service/api';
import filters from './mock';
import './styles.css';

export function Produtos({ user }) {
    // Guarda os estados dos filtros e também uma lista com todos os produtos e outra com os produtos de acordo com o filtro, para que não precise fazer buscas no backend.
    const [filtersBranch, setFiltersBranch] = useState([]);
    const [filtersType, setFiltersType] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/product/home', {
                params: {
                    idUser: user.id
                }
            });

            const { products } = response.data;

            setProducts(products);
            setProductsList(products);
        }

        loadProducts();
    }, []);

    const defineFilter = (items, checked, id) => {
        if (checked) {
            items.push(id);
        } else {
            items = items.filter(o => o !== id);
        }

        return items;
    };

    const onCheckFilter = async (filDetail) => {
        filDetail.checked = !filDetail.checked;

        const { checked, type } = filDetail;
        const property = ['Console', 'Acessorio', 'Jogo'].includes(type) ? 'type' : 'branch';

        let itemsType = filtersType,
            itemsBranch = filtersBranch;

        if (property === 'type') {
            itemsType = defineFilter(filtersType, checked, type);
            setFiltersType(itemsType);
        }
        else {
            itemsBranch = defineFilter(filtersBranch, checked, type);
            setFiltersBranch(itemsBranch);
        }

        const productsFiltered = products.filter(o =>
            (itemsType.length === 0 || itemsType.includes(o.type)) &&
            (itemsBranch.length === 0 || itemsBranch.includes(o.branch)));

        setProductsList(productsFiltered);
    };

    const addProduct = async function (productSelected) {
        const { id } = productSelected;

        const product = {
            idProduct: id,
            idUser: user.id,
            quantity: 1
        };

        await api.post('/product/add', { product });
    }

    return (
        <div className="main">
            <div className="filtros">
                {filters.map(filt => (
                    <div key={filt.type}>
                        <h4>{filt.type}</h4>
                        {filt.filtersDetail.map(filDetail => (
                            <div className="flex-row" key={filDetail.id} onChange={() => onCheckFilter(filDetail)}>
                                <input type="checkbox" name={filDetail.type} id={filDetail.type} className="filters-type-product" />
                                <label htmlFor={filDetail.type}>{filDetail.description}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <ul className="products flex-wrap">
                {productsList.map(product => (
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