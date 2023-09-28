import axios from "axios";
const config = require('../configuracoes.json')

// AQUI É REALIZADO A COMUNICAÇÃO COM O BACK

const ipC = config.m2.ipC;
const apiC = axios.create({
  baseURL: 'http://' + ipC,
});


export { apiC };