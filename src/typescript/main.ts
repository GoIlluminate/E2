import path = require('path')
import express = require('express')
import config = require("./config/config")
const app = require("./config/express")()
const isDevelopment = process.env.NODE_ENV !== 'production'
const port = isDevelopment ?  config.port : process.env.PORT

const routes = require('./routes')
app.get('/color', routes.color)

// Serving compiled elm client
if (isDevelopment) {
  require('./webpackServeBundle')(app)
} else {
  app.use(express.static(path.join(__dirname, '/../dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/../dist/index.html'))
  )
}

// Starting express
if (!module.parent) {
  app.listen(port, err => {
    if (err) console.log(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
