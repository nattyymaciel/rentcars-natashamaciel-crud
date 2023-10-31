const sequelize = require('sequelize')
const express = require('express')

const Sequelize = sequelize.Sequelize

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

const port = 3000

app.listen(port, () => {
  console.log(`On port ${port}`)
})