const path = require('path')
const express = require('express')
const cors =require('cors')
const morgan = require('morgan')
const planetsRouter = require('./routes/Planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')
const app= express()

app.use(cors(
    {
        origin:"http//localhost:3000"
    }
))

app.use(morgan('combined'))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'data')))

app.use('/planets', planetsRouter)
app.use('/launches',launchesRouter)


module.exports = app