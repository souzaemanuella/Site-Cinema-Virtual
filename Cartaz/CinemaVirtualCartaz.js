const filmes = 
{
acao: [
  { titulo: "Vingadores", idade: "12", poster: "../Imagens/poster6.jpeg" },
  { titulo: "Superman", idade: "12", poster: "../Imagens/poster4.jpg" },
  { titulo: "Mad Max: Estrada da Fúria", idade: "14", poster: "../Imagens/postermadmax.jpg" },
  { titulo: "John Wick", idade: "16", poster: "../Imagens/poster_jhonwick.jpg" }
],
comedia: [
  { titulo: "A Grande Viagem de Sua Vida", idade: "L", poster: "../Imagens/poster2.jpeg" },
  { titulo: "Se beber não case", idade: "14", poster: "../Imagens/poster_Sebebernaocase.jpg" },
  { titulo: "Deadpool e Wolverine", idade: "16", poster: "../Imagens/poster_deadpool.webp" },
  { titulo: "Esqueceram de mim 2", idade: "L", poster: "../Imagens/poster_esqueceramDeMIm.webp" }
],
drama: [
  { titulo: "A longa jornada", idade: "12", poster: "../Imagens/foto1_filme.avif" },
  { titulo: "Titanic", idade: "14", poster: "../Imagens/poster7.jpg" },
  { titulo: "O poderoso chefão", idade: "16", poster: "../Imagens/poster_PoderosoChefao.webp" },
  { titulo: "A vida é bela", idade: "12", poster: "../Imagens/poster_VidaéBela.jpeg" }
],
terror: [
  { titulo: "It:A coisa", idade: "16", poster: "../Imagens/poster_it.jpeg" },
  { titulo: "Invocação do mal", idade: "16", poster: "../Imagens/poster_InvocaoDoMal.png" },
  { titulo: "Saw", idade: "18", poster: "../Imagens/poster_saw.jpg" },
  { titulo: "O exorcista", idade: "18", poster: "../Imagens/poster_OExorcista.jpg" }
],
fantasia: [
  { titulo: "Wicked", idade: "L", poster: "../Imagens/poster wicked.jpeg" },
  { titulo: "Toy story 4", idade: "L", poster: "../Imagens/foto3_filme.avif" },
  { titulo: "avatar", idade: "12", poster: "../Imagens/poster5.jpeg" },
  { titulo: "Ne Zha 2", idade: "14", poster: "../Imagens/poster3.png" }
]
};

const cores = {
  "12": "rgb(238, 207, 69)",
  "14": "orange",
  "16": "red",
  "18": "black",
  "L": "green"
};


//funcao pra colocar indicador com cor
document.querySelectorAll(".indicador").forEach(ind => {
  const idade = ind.textContent;
  ind.style.backgroundColor = cores[idade];   
});

//funcao para as imgs levarem para a bilheteria
document.querySelectorAll(".card_filmes img").forEach(img => {
    img.addEventListener("click", () => {
        window.location.href = "placeholder.html"; //Colocar o arquivo da bilheteria aq
    });
});

//funcao pra mostrar os filmes certos e com o msm estilo de antes
function mostrarFilmes(genero) {
const container = document.getElementById("container_generos");
container.innerHTML = "";
filmes[genero].forEach(f => {
    container.innerHTML += `
    <div class="card_filmes">
        <div class="titulo_container">
          <div class="titulo_filme">${f.titulo}</div>
          <div class="indicador" style="background-color: ${cores[f.idade]}"> ${f.idade} </div>
        </div>
        <img src="${f.poster}" class="poster">
    </div>`;

    
});
}

mostrarFilmes('acao');

//função remover acento
function removerAcento(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

//função  mudar de genero ao clicar e selecionar a caixa atual
document.querySelectorAll("#generos .opcoes_genero").forEach(op => {
    op.addEventListener("click", () => {
        document.querySelectorAll("#generos .opcoes_genero").forEach(btn => {
          btn.classList.remove("opcoes_genero_selecionado")
        });
        op.classList.add("opcoes_genero_selecionado");
        const genero = removerAcento(op.textContent);;
        mostrarFilmes(genero);
    });
});
