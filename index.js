const express = require('express')
const bodyParser = require('body-parser')
const app = express()

if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

const { PORT, DB_URL } = process.env
require('./mongoose')(DB_URL)

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json(err)
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

fornecedoresRoutes = require('./routes/fornecedores')()
app.use('/api/fornecedores', fornecedoresRoutes)
comprasRoutes = require('./routes/compras')()
app.use('/api/compras', comprasRoutes)

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.listen(PORT || 8080, () => console.log(`API is running on port ${PORT || 8080}!`))