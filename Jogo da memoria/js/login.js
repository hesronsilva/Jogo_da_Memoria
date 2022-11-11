const input = document.querySelector('.login-input');
const botao = document.querySelector('.login-botao');
const form = document.querySelector('.login-form');

const inputValidado = ({ target }) => {
    if (target.value.length >= 1) {
        botao.removeAttribute('disabled');
        return;
    }
    botao.setAttribute('disabled', '');
}

const iniciarPressionado = (event) => {
    event.preventDefault();

    localStorage.setItem('jogador', input.value);
    window.location = 'pages/jogo.html';
}

input.addEventListener('input', inputValidado);
form.addEventListener('submit', iniciarPressionado);
