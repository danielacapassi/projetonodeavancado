const fetch = require("node-fetch");

module.exports = async function buscarGithub(nome, repositorio) {
  const response = await fetch(
    `https://api.github.com/repos/${nome}/${repositorio}`
  );
  const json = await response.json();
  console.log(json);
  return json;
};
