const express = require('express')
const app= express()
const planetsRouter = require('./Planets/planets.router')
const launchesRouter = require('./launches/launches.router')
const api = express.Router()

app.use('/planets', planetsRouter)
app.use('/launches',launchesRouter)


module.exports = api