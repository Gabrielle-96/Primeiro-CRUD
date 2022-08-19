const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require('./usuarioController');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.post('/cadastro', async (req, res) => {
  try {
    res.json(await usuarioController.inserir(req.body));
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Erro ao gravar usuario"
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});