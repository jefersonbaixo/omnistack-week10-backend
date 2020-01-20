const express = require("express");
const mongoose = require("mongoose");
const routes = require("../src/routes");
const cors = require("cors");
require("dotenv/config");

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-qignm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(routes);

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de Parâmetros
//Query Params: req.query (Filtros, Ordenação, Paginação)
//Route Params: req.params (Identificar recurso no alteração ou remoção)
//Body: req.body (Dados para criação ou alteração de um registro)

app.listen(3333);
