const filmesCompletos = {
  1:  { id: 1,  genero: "acao",     titulo: "Vingadores",                        idade: "12", poster: "Imagens/poster6.jpeg" },
  2:  { id: 2,  genero: "acao",     titulo: "Superman",                          idade: "12", poster: "Imagens/poster4.jpg" },
  3:  { id: 3,  genero: "acao",     titulo: "Mad Max: Estrada da Fúria",        idade: "14", poster: "Imagens/postermadmax.jpg" },
  4:  { id: 4,  genero: "acao",     titulo: "John Wick",                         idade: "16", poster: "Imagens/poster_jhonwick.jpg" },

  5:  { id: 5,  genero: "comedia",  titulo: "A Grande Viagem de Sua Vida",       idade: "L",  poster: "Imagens/poster2.jpeg" },
  6:  { id: 6,  genero: "comedia",  titulo: "Se beber não case",                 idade: "14", poster: "Imagens/poster_Sebebernaocase.jpg" },
  7:  { id: 7,  genero: "comedia",  titulo: "Deadpool e Wolverine",              idade: "16", poster: "Imagens/poster_deadpool.webp" },
  8:  { id: 8,  genero: "comedia",  titulo: "Esqueceram de mim 2",               idade: "L",  poster: "Imagens/poster_esqueceramDeMIm.webp" },

  9:  { id: 9,  genero: "drama",    titulo: "A longa jornada",                   idade: "12", poster: "Imagens/foto1_filme.avif" },
  10: { id: 10, genero: "drama",    titulo: "Titanic",                           idade: "14", poster: "Imagens/poster7.jpg" },
  11: { id: 11, genero: "drama",    titulo: "O poderoso chefão",                idade: "16", poster: "Imagens/poster_PoderosoChefao.webp" },
  12: { id: 12, genero: "drama",    titulo: "A vida é bela",                     idade: "12", poster: "Imagens/poster_VidaéBela.jpeg" },

  13: { id: 13, genero: "terror",   titulo: "It:A coisa",                        idade: "16", poster: "Imagens/poster_it.jpeg" },
  14: { id: 14, genero: "terror",   titulo: "Invocação do mal",                  idade: "16", poster: "Imagens/poster_InvocaoDoMal.png" },
  15: { id: 15, genero: "terror",   titulo: "Saw",                               idade: "18", poster: "Imagens/poster_saw.jpg" },
  16: { id: 16, genero: "terror",   titulo: "O exorcista",                       idade: "18", poster: "Imagens/poster_OExorcista.jpg" },

  17: { id: 17, genero: "fantasia", titulo: "Wicked",                            idade: "L",  poster: "Imagens/poster wicked.jpeg" },
  18: { id: 18, genero: "fantasia", titulo: "Toy story 4",                       idade: "L",  poster: "Imagens/foto3_filme.avif" },
  19: { id: 19, genero: "fantasia", titulo: "Avatar",                            idade: "12", poster: "Imagens/poster5.jpeg" },
  20: { id: 20, genero: "fantasia", titulo: "Ne Zha 2",                          idade: "14", poster: "Imagens/poster3.png" }
};

const cores = {
  "12": "rgb(238, 207, 69)",
  "14": "orange",
  "16": "red",
  "18": "black",
  "L": "green"
};
 
document.addEventListener('click', function(event) {
    
    const target = event.target;

    if (target.classList.contains('btn-comprar')) {
        const card = target.closest('.card_filmes');
        if (card) {
            const filmeId = card.dataset.filmeId;
            console.log(`Botão Comprar clicado para o filme ID: ${filmeId}`);
            window.location.href = `compra.html?filmeId=${filmeId}`;
        }
    }

    if (target.classList.contains('poster')) {
        const card = target.closest('.card_filmes');
        if (card) {
            const filmeId = card.dataset.filmeId;
            console.log(`Poster clicado para o filme ID: ${filmeId}`);
            window.location.href = "placeholder.html";
        }
    }
});

document.querySelectorAll(".indicador").forEach(ind => {
  const idade = ind.textContent;
  if (cores[idade]) {
    ind.style.backgroundColor = cores[idade];
  }
});

//funcao pra mostrar os filmes certos na seção de Gênero
function mostrarFilmes(genero) {
  const container = document.getElementById("container_generos");
  container.innerHTML = "";

  const filmesGenero = Object.values(filmesCompletos).filter(f => removerAcento(f.genero) === removerAcento(genero));

  filmesGenero.forEach(f => {
    const card = document.createElement("div");
    card.classList.add("card_filmes");
    card.dataset.filmeId = f.id; 

    card.innerHTML = `
      <div class="titulo_container">
        <div class="titulo_filme">${f.titulo}</div>
        <div class="indicador" style="background-color: ${cores[f.idade]}">${f.idade}</div>
      </div>
      <img src="${f.poster}" class="poster">
      <button class="btn-comprar">Comprar Ingresso</button>
    `;
  
    container.appendChild(card);
  });
}

// Inicia mostrando os filmes de ação por padrão
mostrarFilmes('acao');

function removerAcento(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}


document.querySelectorAll("#generos .opcoes_genero").forEach(op => {
    op.addEventListener("click", () => {
        document.querySelectorAll("#generos .opcoes_genero").forEach(btn => {
          btn.classList.remove("opcoes_genero_selecionado")
        });
        op.classList.add("opcoes_genero_selecionado");
        const genero = removerAcento(op.textContent);
        mostrarFilmes(genero);
    });
});

