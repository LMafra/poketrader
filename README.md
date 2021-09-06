![alt text](https://i2.wp.com/i.imgur.com/Gc979LS.gif?w=640)
# PokéTrader


## Introdução

Calculadora de troca de pokémons, mostrando se a troca entre dois times, de 1 até 6 pokémons, é justa ou não.

Para sua realização, foi utilizada a api do [PokéApi](https://pokeapi.co/) para obter os pokémons e seus valores.

### Backend

O backend tem o papel de alimentar o front com as informações da Api. Foi construído em Node.js, utilizando Express.js como framework, com SQLite como banco, utilizando de Knex para facilitar as conexões. Além disso, foi utilizado ESLint para melhores práticas de escritas e Jest para realizar testes unitários e de cobertura.

#### Como compilar 

Para rodar o banco, basta entrar na pasta backend e rodar o seguinte comandos:

```js
  knex migrate:latest
```

Caso queira deletar o banco, basta rodar o seguinte comando:

```js
  knex migrate:rollback
```


Para compilar o código, basta entrar na pasta backend e rodar os seguintes comandos:

```js
  npm install
  npm start
```

### Frontend

O frontend tem o papel de obter as informações do backend e mostrar para o usuário. Foi construído em Vuejs, com framework Vuetify. Além disso, foi utilizado ESLint para melhores práticas de escritas e Jest para realizar testes unitários e de cobertura.

#### Como compilar

Para compilar o código, basta entrar na pasta frontend e rodar os seguintes comandos:

```js
  yarn
  npm run dev
```
