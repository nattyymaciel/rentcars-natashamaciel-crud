const sequelize = require('sequelize')
const express = require('express')

const Sequelize = sequelize.Sequelize

// conectando o banco de dados
const connection = new Sequelize(
    'testing',
    'root',
    'ANSKk08aPEDbFjDO',
    {
        dialect: "mysql",
        host: 'localhost',
    port: 3307
    }
);

// criando a tabela Veiculos no banco de dados
const Veiculos = connection.define('veiculos', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    locadora: {
        type: Sequelize.STRING,
        primaryKey: false,
    },
    modelo: {
        type: Sequelize.STRING,
        primaryKey: false,
    },
    marca: {
        type: Sequelize.STRING,
        primaryKey: false,
    },
    ano: {
        type: Sequelize.INTEGER(4),
        primaryKey: false,
    },
    motor: {
        type: Sequelize.FLOAT,
        primaryKey: false,
    },
    portas: {
        type: Sequelize.INTEGER,
        primaryKey: false,
    },
    cambio: {
        type: Sequelize.STRING,
        primaryKey: false,
    },
    ar_condicionado: {
        type: Sequelize.BOOLEAN,
        primaryKey: false,
    },
})


connection.sync({force: true})

const app = express()
app.use(express.json());

// resolvendo o problema de cors
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next();
  };

app.use(allowCrossDomain)

// endpoint de post para criação de um novo veiculo
app.post('/veiculos', (req, res) => {
    const resp = {}

    try {
        Veiculos.build(req.body).save()
        resp.status = "ok"
    } catch (error) {
        resp.status = 'fail'
    }

    res.json(resp)
})

// endpoint de get para buscar todos os veiculos cadastrados
app.get('/veiculos', (req, res) => {
    const resp = {}

    try {
        Veiculos.findAll()
        .then(e => {
            res.json(e)
        })
        
    } catch (error) {
        resp.status = 'fail'

        res.json(resp)
    }
})

// endpoint de get para buscar um veiculo especifico pelo id dele
app.get('/veiculos/:id', (req, res) => {
    const resp = {}

    try {
        Veiculos.findAll({
            where:{
                id:req.params.id
            }
        })
        .then(e => {
            res.json(e)
        })
        
    } catch (error) {
        console.log(error)
        resp.status = 'fail'

        res.json(resp)
    }
})

// endpoint de put para editar um veiculo especifico
app.put('/veiculos/:id', (req, res) => {
    const resp = {}

    try {
        Veiculos.findOne({
            where:{
                id:req.params.id
            }
        })
        .then(e => {
            e.update(req.body)
            
            res.json(e)
        })
        
    } catch (error) {
        resp.status = 'fail'

        res.json(resp)
    }
})

// endpoint de delete para apagar um veiculo especifico atraves do id dele
app.delete('/veiculos/:id', (req, res) => {
    let resp = {}

    try {
        Veiculos.destroy({
            where:{
                id:req.params.id
            }
        })
        resp.status = 'ok'
    } catch (error) {
        resp.status = 'fail'
    }

    res.json(resp)
})

// iniciando o servidor na porta 3000
const port = 3000
app.listen(port, () => {
  console.log(`On port ${port}`)
})