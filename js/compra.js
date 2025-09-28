// Este script roda apenas na página compra.html
document.addEventListener('DOMContentLoaded', function() {

  // Objeto de filmes atualizado para corresponder a TODOS os cards no HTML
  const filmes = {
    1: { id: 1, titulo: 'A Longa Jornada', poster: 'Imagens/poster5.jpeg' },
    2: { id: 2, titulo: 'A Grande Viagem de Sua Vida', poster: 'Imagens/poster6.jpeg' },
    3: { id: 3, titulo: 'Toy Story 4', poster: 'Imagens/foto3_filme.avif' },
    4: { id: 4, titulo: 'Superman', poster: 'Imagens/poster7.jpg' },
    5: { id: 5, titulo: 'A Longa Jornada (Alt)', poster: 'Imagens/foto1_filme.avif' },
    6: { id: 6, titulo: 'A Grande Viagem de sua vida (Alt)', poster: 'Imagens/poster2.jpeg' },
    7: { id: 7, titulo: 'Ne Zha 2', poster: 'Imagens/poster3.png' },
    8: { id: 8, titulo: 'Superman (Alt)', poster: 'Imagens/poster4.jpg' },
    9: { id: 9, titulo: 'A longa jornada (Alt 2)', poster: 'Imagens/foto1_filme.avif' },
    10: { id: 10, titulo: 'A Grande Viagem de sua vida (Alt 2)', poster: 'Imagens/poster2.jpeg' },
    11: { id: 11, titulo: 'Toy Story 4 (Alt)', poster: 'Imagens/poster3.png' },
    12: { id: 12, titulo: 'Superman (Alt 2)', poster: 'Imagens/poster4.jpg' }
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
    const filme = filmes[filmeId];
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