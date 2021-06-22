let tiposProduto = [
    {
        description: 'Consoles',
        type: 'Console',
        id: 1,
        checked: false
    },
    {
        description: 'Acessórios',
        type: 'Acessorio',
        id: 2,
        checked: false
    },
    {
        description: 'Jogos',
        type: 'jogos',
        id: 3,
        checked: false
    }
];

let marcas = [
    {
        description: 'Nintendo',
        type: 'Nintendo',
        id: 4,
        checked: false
    },
    {
        description: 'Playstation',
        type: 'Playstation',
        id: 5,
        checked: false
    },
    {
        description: 'Sega',
        type: 'Sega',
        id: 6,
        checked: false
    },
    {
        description: 'Xbox',
        type: 'Xbox',
        id: 7,
        checked: false
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

export default filters;