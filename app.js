const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const buscarGithub = require("./src/functions/buscarGithub");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declarando que vou usar o ejs
app.set("view engine", "ejs");
// Mostrando para o express onde ta minha pasta views
app.set("views", "./src/views");

// renderizando minha pagina principal
app.get("/", (req, res) => {
  // chamando o arquivo da minha view
  res.render("index");
});

// pegando os dados da minha view
app.post("/envia-github", async (req, res) => {
  const { nome } = req.body;
  const { repositorio } = req.body;
  buscarGithub(nome, repositorio).then((resultado) => {
    if (resultado.message === "Not Found") {
      res.render("resultado", {
        dado: {
          name: "Repositorio não encontrado",
          clone_url: "-",
          created_at: "-",
          language: "-",
          description: "-",
          owner: { login: "-" },
        },
      });
    } else {
      console.log("Conectou com sucesso");
      res.render("resultado", { dado: resultado });
    }
    //console.log(res.statusCode)
    console.log(resultado.message);
  });
});

app.listen(3334);

