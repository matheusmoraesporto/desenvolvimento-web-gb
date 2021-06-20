const tiposProduto = [
    {
        description: 'Consoles',
        type: 'consoles',
        id: 1
    },
    {
        description: 'Acessórios',
        type: 'acessorios',
        id: 2
    },
    {
        description: 'Jogos',
        type: 'jogos',
        id: 3
    }
];

const marcas = [
    {
        description: 'Nintendo',
        type: 'nintendo',
        id: 4
    },
    {
        description: 'Playstation',
        type: 'playstation',
        id: 5
    },
    {
        description: 'Sega',
        type: 'sega',
        id: 6
    },
    {
        description: 'Xbox',
        type: 'xbox',
        id: 7
    }
];

const filters = [
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