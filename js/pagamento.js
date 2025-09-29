const button = document.getElementById('pagamento');
const alerta = document.getElementById('alerta');

button.addEventListener('click', function(event) {
    event.preventDefault();
    alerta.style.display = 'block';
    setTimeout(() => {
        alerta.style.display = 'none';
        window.location.href = "index.html";
    }, 3000);
})


