// Este script roda apenas na página compra.html
document.addEventListener('DOMContentLoaded', function() {

  //Filmes da area genero
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

  const sessoesPadrao = [
    { data: '2025-09-28', horarios: ['13:00', '15:30', '18:00', '20:30'] },
    { data: '2025-09-29', horarios: ['12:00', '14:30', '17:00', '19:30'] },
    { data: '2025-09-30', horarios: ['11:30', '14:00', '16:45', '19:15'] }
  ];

  const VALOR_UNITARIO = 20;
  let assentosSelecionados = new Set();

  // Elementos do DOM da página de compra
  const tituloFilmeEl = document.getElementById('tituloFilme');
  const posterFilmeEl = document.getElementById('posterFilme');
  const selectData = document.getElementById('selectData');
  const selectHorario = document.getElementById('selectHorario');
  const assentosGrid = document.getElementById('assentos');
  const contagemEl = document.getElementById('contagem');
  const valorUnitarioEl = document.getElementById('valorUnitario');
  const valorTotalEl = document.getElementById('valorTotal');
  const confirmarBtn = document.getElementById('confirmarCompra');

  // Função para pegar o ID do filme da URL
  function getFilmeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('filmeId');
  }

  // Carrega as informações do filme na página
  function carregarDadosDoFilme(filmeId) {
    const filme = filmesCompletos[filmeId];

    if (filme) {
      tituloFilmeEl.textContent = `Comprar — ${filme.titulo}`;
      posterFilmeEl.src = filme.poster;
    } else {
      tituloFilmeEl.textContent = "Filme não encontrado";
    }
  }

  function atualizarResumo() {
    contagemEl.textContent = assentosSelecionados.size;
    valorTotalEl.textContent = (assentosSelecionados.size * VALOR_UNITARIO).toFixed(2);
  }
  
  function popularDatas() {
    selectData.innerHTML = '';
    sessoesPadrao.forEach((s, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        const dataCorrigida = new Date(s.data);
        dataCorrigida.setDate(dataCorrigida.getDate() + 1);
        opt.textContent = dataCorrigida.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        selectData.appendChild(opt);
    });
    popularHorarios(0);
  }

  function popularHorarios(index) {
    selectHorario.innerHTML = '';
    const horarios = sessoesPadrao[index].horarios;
    horarios.forEach(h => {
        const opt = document.createElement('option'); opt.value = h; opt.textContent = h; selectHorario.appendChild(opt);
    });
  }
  
  function gerarAssentos() {
    assentosGrid.innerHTML = '';
    const cols = 8; const rows = 6;
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            const id = `${String.fromCharCode(65+r)}${c+1}`;
            const btn = document.createElement('button');
            btn.className = 'assento'; btn.type = 'button'; btn.dataset.id = id; btn.textContent = id;
            if(Math.random() < 0.12){ btn.classList.add('occupied'); }
            assentosGrid.appendChild(btn);
        }
    }
  }
  
  // --- EVENTOS ---
  selectData.addEventListener('change', (e) => popularHorarios(e.target.value));
  
  assentosGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.assento');
    if (!btn || btn.classList.contains('occupied')) return;
    const id = btn.dataset.id;
    if (assentosSelecionados.has(id)) {
      assentosSelecionados.delete(id);
      btn.classList.remove('selected');
    } else {
      assentosSelecionados.add(id);
      btn.classList.add('selected');
    }
    atualizarResumo();
  });
  
  confirmarBtn.addEventListener('click', () => {
    if (assentosSelecionados.size === 0) {
      alert('Selecione ao menos 1 assento.');
      return;
    }
    
    alert('Compra confirmada! (simulação)');
    // Corrigido para o nome correto do seu arquivo principal
    window.location.href = 'CinemaVirtualCartaz.html'; 
  });


  // --- INICIALIZAÇÃO DA PÁGINA ---
  const filmeId = getFilmeIdFromURL();
  if (filmeId) {
    carregarDadosDoFilme(filmeId);
    valorUnitarioEl.textContent = VALOR_UNITARIO.toFixed(2);
    popularDatas();
    gerarAssentos();
    atualizarResumo();
  } else {
    document.body.innerHTML = '<h1>Erro: Nenhum filme selecionado. <a href="CinemaVirtualCartaz.html">Voltar para a bilheteria.</a></h1>';
  }
});
