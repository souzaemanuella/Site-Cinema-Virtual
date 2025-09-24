const filmes = {
acao: [
      { titulo: "Ação 1", idade: "v16", poster: "Imagens/poster6" },
  { titulo: "Ação 2", idade: "v14", poster: "https://via.placeholder.com/300x300?text=Ação+2" }
],
    comedia: [
  { titulo: "Comédia 1", idade: "l", poster: "https://via.placeholder.com/300x300?text=Comedia+1" },
  { titulo: "Comédia 2", idade: "v12", poster: "https://via.placeholder.com/300x300?text=Comedia+2" }
],
drama: [
  { titulo: "Drama 1", idade: "v14", poster: "https://via.placeholder.com/300x300?text=Drama+1" },
  { titulo: "Drama 2", idade: "v16", poster: "https://via.placeholder.com/300x300?text=Drama+2" }
],
terror: [
  { titulo: "Terror 1", idade: "v18", poster: "https://via.placeholder.com/300x300?text=Terror+1" },
  { titulo: "Terror 2", idade: "v16", poster: "https://via.placeholder.com/300x300?text=Terror+2" }
],
    fantasia: [
    { titulo: "Animação 1", idade: "l", poster: "https://via.placeholder.com/300x300?text=Animacao+1" },
    { titulo: "Animação 2", idade: "l", poster: "https://via.placeholder.com/300x300?text=Animacao+2" }
]
};

function mostrarFilmes(genero) {
const container = document.getElementById("container_card");
container.innerHTML = "";
filmes[genero].forEach(f => {
    container.innerHTML += `
    <div class="card_filmes">
        <div class="titulo_container">
        <div class="titulo_filme">${f.titulo}</div>
        <div class="indicador ${f.idade}">${f.idade.toUpperCase()}</div>
        </div>
        <img src="${f.poster}" class="poster">
    </div>`;
});
}

mostrarFilmes('acao');

