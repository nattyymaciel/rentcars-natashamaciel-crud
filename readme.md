<h1>Projeto CRUD- RentCars</h1> 


## Descrição do projeto 

<p align="justify">
O projeto consiste na criação de uma aplicação que irá realizar o gerenciamento de um sistema de locação de veículos, onde o usuário(funcionário) irá poder adicionar, alterar e excluir produtos do catálogo da empresa e visualizar os produtos que constam no banco de dados.</p>

## Funcionalidades

Funcionalidade 1: Adicionar um produto ao catálogo da empresa;
Funcionalidade 2: Alterar os dados de um produto já existente;
Funcionalidade 3: Excluir o produto do catálogo;
Funcionalidade 4: Consultar os dados dos produtos existentes no banco de dados.


## Layout

> Link do deploy da aplicação. Exemplo com netlify: https://certificates-for-everyone-womakerscode.netlify.app/

... 

Se ainda não houver deploy, insira capturas de tela da aplicação ou gifs

## Pré-requisitos

* Node JS LTS (versão 18)
* Docker


## Como rodar a aplicação :arrow_forward:

### No Backend
1. Execute o Docker
2. Verifique se o computador tem a pasta /tmp/mysql-data criada, caso não tenha crie com o comando:
```
$ mkdir /tmp/mysql-data
```
3. Execute o comando para iniciar o MySQL no Docker:
```
$ docker run --name basic-mysql --rm -v /tmp/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=ANSKk08aPEDbFjDO -e MYSQL_DATABASE=testing -p 3307:3306 -it mysql:8.0
```
4. No diretorio raiz do projeto, inicie o backend com o comando:
```
$ npm run start
```

### no Frontend
1. Na pasta my_app/frontend abra no navegador o arquivo index.html

## Linguagens, dependencias e libs utilizadas :books:

* Node JS LTS (versão 18):
** Express;
** Sequelize;
** Nodemon;
* JavaScript;
* HTML;
* CSS;
* MySQL;


## Resolvendo Problemas :exclamation:
* No backend, o exemplo fornecido para o endpoint de DELETE estava com um problema para preencher a resposta de sucesso devido ao formato utilizado. Foi alterado para o mesmo formato do exemplo de status de falha para a correção no funcionamento.
* Ao realizar as chamadas do frontend para o backend houve um problema referente ao erro de CORS. Após muita pesquisa foi realizada a correção acrescentando na tag “app” do backend a configuração de liberação de acesso aos endpoints para qualquer origem.

 

## Desenvolvedores/Contribuintes :octocat:

[Natasha Maciel](https://github.com/nattyymaciel)
