document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de compra
    const botoesComprar = document.querySelectorAll('.btn-comprar');

    // Adiciona um ouvinte de evento de clique para cada botão
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', function() {
            // Encontra o card pai do botão que foi clicado
            const card = this.closest('.card_filmes');
            
            // Pega o valor do atributo 'data-filme-id' do card
            const filmeId = card.dataset.filmeId;

            // Se o ID do filme existir, redireciona para a página de compra
            if (filmeId) {
                // Constrói a URL com o ID do filme como um parâmetro de busca
                window.location.href = `compra.html?filmeId=${filmeId}`;
            } else {
                console.error('Atributo data-filme-id não encontrado no card.');
            }
        });
    });
});