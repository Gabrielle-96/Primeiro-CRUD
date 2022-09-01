const express = require('express')
const cors = require('cors')
require('dotenv').config();

const router = require('./routes/routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000")
});