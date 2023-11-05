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

1. Tela inicial
![image](https://github.com/nattyymaciel/my_app/blob/main/prints/tela-inicial.png)

2. Tela de adicionar novo veículo
![image](https://github.com/nattyymaciel/my_app/blob/main/prints/adicionar-veiculo.png)

3. Tela de listar veículos
![image](https://github.com/nattyymaciel/my_app/blob/main/prints/listar-veiculo.png)

4. Tela de editar veículo
![image](https://github.com/nattyymaciel/my_app/blob/main/prints/editar-veiculo.png)

## Pré-requisitos

* Node JS LTS (versão 18)
* Docker


## Como rodar a aplicação

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

### No Frontend
1. Na pasta my_app/frontend abra no navegador o arquivo index.html

## Linguagens, dependencias e libs utilizadas

* Node JS LTS (versão 18):
  * Express;
  * Sequelize;
  * Nodemon;
* JavaScript;
* HTML;
* CSS;
* MySQL;


## Resolvendo Problemas
* No backend, o exemplo fornecido para o endpoint de DELETE estava com um problema para preencher a resposta de sucesso devido ao formato utilizado. Foi alterado para o mesmo formato do exemplo de status de falha para a correção no funcionamento.
* Ao realizar as chamadas do frontend para o backend houve um problema referente ao erro de CORS. Após muita pesquisa foi realizada a correção acrescentando na tag “app” do backend a configuração de liberação de acesso aos endpoints para qualquer origem.

 

## Desenvolvedores

[Natasha Maciel](https://github.com/nattyymaciel)
