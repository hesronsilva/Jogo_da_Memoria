const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.jogador');
const cronometro = document.querySelector('.tempo');

const personagens = [
    'barney',
    'bart',
    'cobra',
    'duffy_girl',
    'home',
    'lisa',
    'mag',
    'marge',
    'moe',
    'nelson',
    'sr_burns',
    'vovô',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let primeiraCarta = '';
let segundaCarta = '';

const checarFimjogo = () => {
    const cartasDesativadas = document.querySelectorAll('.cartaDesativada')

    if (cartasDesativadas.length == 24) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanJogador.innerHTML}, você conseguiu finalizar o jogo!!Seu tempo foi ${cronometro.innerHTML}`);
    }
}

const checarcarta = () => {
    const primeiraPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundaPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiraPersonagem == segundaPersonagem) {

        primeiraCarta.firstChild.classList.add('cartaDesativada')
        segundaCarta.firstChild.classList.add('cartaDesativada')

        primeiraCarta = '';
        segundaCarta = '';

        checarFimjogo();

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('virarCarta');
            segundaCarta.classList.remove('virarCarta');

            primeiraCarta = '';
            segundaCarta = '';
        }, 500)

    }
}

const virarCarta = ({ target }) => {
    if (target.parentNode.className.includes('virarCarta')) {
        return;
    }

    if (primeiraCarta == '') {
        target.parentNode.classList.add('virarCarta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
        target.parentNode.classList.add('virarCarta');
        segundaCarta = target.parentNode;
    }

    checarcarta();
}

const criarCarta = (personagem) => {
    const carta = createElement('div', 'carta');
    const frente = createElement('div', 'face frente');
    const tras = createElement('div', 'face tras');

    frente.style.backgroundImage = `url('../img/${personagem}.png')`;

    carta.appendChild(frente);
    carta.appendChild(tras);

    carta.addEventListener('click', virarCarta);
    carta.setAttribute('data-personagem', personagem);

    return carta;
}

const carregarJogo = () => {

    const duplicaPersonagens = [...personagens, ...personagens];

    const embaralhaPersonagens = duplicaPersonagens.sort(() => Math.random() - 0.5);

    embaralhaPersonagens.forEach((personagem) => {
        const carta = criarCarta(personagem);
        grid.appendChild(carta);
    })

}

const iniciarCronometro = () => {

    this.loop = setInterval(() => {
        const tempoInicial = +cronometro.innerHTML;
        cronometro.innerHTML = tempoInicial + 1;

    }, 1000)
}

window.onload = () => {

    spanJogador.innerHTML = localStorage.getItem('jogador');
    iniciarCronometro();
    carregarJogo();
}

