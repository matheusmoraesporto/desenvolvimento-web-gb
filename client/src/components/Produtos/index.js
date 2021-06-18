import roundedUp from '../../assets/icons/rounded-up.svg';

import './styles.css';

export function Produtos() {
    let tiposProduto = [
        {
            description: 'Consoles',
            type: 'consoles'
        },
        {
            description: 'Acessórios',
            type: 'acessorios'
        },
        {
            description: 'Jogos',
            type: 'jogos'
        }
    ];

    let marcas = [
        {
            description: 'Nintendo',
            type: 'nintendo'
        },
        {
            description: 'Playstation',
            type: 'playstation'
        },
        {
            description: 'Sega',
            type: 'sega'
        },
        {
            description: 'Xbox',
            type: 'xbox'
        }
    ];

    let filters = [
        {
            type: 'Tipo de produtos',
            filtersDetail: tiposProduto
        },
        {
            type: 'Marca',
            filtersDetail: marcas
        }
    ];

    console.log(JSON.stringify(filters));

    let products = [
        {
            id: 1,
            description: "Controle Dreamcast",
            img: "../assets/objectImages/Controle_Dreamcast_Sega.png",
            value: 189.99,
            branch: "Sega",
            type: "Acessorio",
            productCode: "9272"
        }
    ];

    return (
        <div className="main">
            <div className="filtros">
                {filters.map(filt => (
                    <>
                        <h4>{filt.type}</h4>
                        {filt.filtersDetail.map(filDetail => (
                            <div className="flex-row">
                                <input type="checkbox" name={filDetail.type} id={filDetail.type} className="filters-type-product" />
                                <label htmlFor={filDetail.type}>{filDetail.description}</label>
                            </div>
                        )
                        )}
                    </>
                )
                )}
            </div>

            <div className="products flex-wrap">
                {products.map(product => (
                    <div className="card-products filter-drop-shadow">
                        <img src={product.img} alt={product.description} className="products-images" />

                        <div className="description">
                            <p className="products-description">{product.description}</p>
                        </div>

                        <p className="products-value">R$ {product.value}</p>

                        <div className="cart-button">
                            <button className="cursor-pointer add-product btn">Adicionar ao carrinho</button>
                        </div>
                    </div>
                ))}

                <button id="gotop" className="cursor-pointer" title="Voltar para o topo da página">
                    <img src={roundedUp} className="icon-20" />
                </button>
            </div>
        </div>
    );
}