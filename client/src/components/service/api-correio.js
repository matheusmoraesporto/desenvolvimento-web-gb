import axios from 'axios';

const apiCorreios = axios.create({
    baseURL: 'http://viacep.com.br/ws'
});

export default apiCorreios;