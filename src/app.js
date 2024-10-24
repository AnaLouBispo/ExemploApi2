require("dotenv").config();
const express = require("express");
const { sequelize } = require("../src/models");
const routes = require("./routers/router");

const app = express();

app.use(express.json());

app.use("/api", routes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados deu certo");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco: ", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("-------------------------");
  console.log(`Running on http://${PORT}`);
  console.log("-------------------------");
});
