const grid = document.querySelector('.grid1');
const timer = document.querySelector('.timer');

const personagem = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiraCarta = '';
let segundaCarta = ''; 

const verificaVenceu = () =>{
    const cartasDesativadas = document.querySelectorAll('.carta-desativada');

    if(cartasDesativadas.length == 20){
        alert(`Parabéns, você ganhou. seu tempo foi de ${timer.innerHTML}`);
        clearInterval(this.loop);
    }
}

let clickBloqueado = false;

const revelaCartao = ({ target }) => {
    if (clickBloqueado || target.parentNode.className.includes('revela-cartao')) {
        return;
    }

    if (primeiraCarta == '') {
        target.parentNode.classList.add('revela-cartao');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == '') {
        target.parentNode.classList.add('revela-cartao');
        segundaCarta = target.parentNode;

        verificaCartas();
    }
}

const verificaCartas = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiroPersonagem == segundoPersonagem) {
        primeiraCarta.firstChild.classList.add('carta-desativada');
        segundaCarta.firstChild.classList.add('carta-desativada');

        primeiraCarta = '';
        segundaCarta = '';

        verificaVenceu();

    } else {
        clickBloqueado = true;
        setTimeout(() => {
            primeiraCarta.classList.remove('revela-cartao');
            segundaCarta.classList.remove('revela-cartao');

            primeiraCarta = '';
            segundaCarta = '';

            clickBloqueado = false;
        }, 500);
    }
}


const createCard = (personagem) => {
    const card = createElement('div', 'cartao');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('./images/${personagem}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener ('click', revelaCartao);
    card.setAttribute('data-personagem', personagem);

    return card;
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const tempoAtual = +timer.innerHTML;
        timer.innerHTML = tempoAtual + 1;
    }, 1000);
}

const loadGame = () => {

    const duplicaPersonagem = [ ...personagem, ...personagem ];

    const embaralhaArray = duplicaPersonagem.sort(() => Math.random() - 0.5);

    embaralhaArray.forEach((personagem) =>{
        const card = createCard(personagem);
        grid.appendChild(card);
    });
}

window.onload = () =>{
    startTimer();
    loadGame();
}