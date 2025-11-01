//se usa:
//. classe
//# id
//nome do elemento
//div h1 => elemento dentro de outro elemento

//querySelector => seleciona apenas um elemento (o primeiro que ele encontrar)
//querySelectorAll => seleciona todos os elementos que correspondem e coloca dentro de um array


const body = document.querySelector("body");
const game = document.querySelector(".game");

const counter = document.querySelector("h1");
const reset = document.querySelector(".reset");

const ash = document.querySelector("#ash");

const charmander = document.querySelector("#Serpent");
const pikachu = document.querySelector("#Skeleton");
const zubat = document.querySelector("#Crib");

const audio = document.querySelector("audio");
audio.volume = 0.4; //volume de 0 a 1

const musicControl = document.querySelector(".music-control");

musicControl.addEventListener("click", (event) => {
    event.stopPropagation()

    event.target.src = `!${event.target.src}`.includes("on.png")
        ? "../assets/icons/off.png"
        : "../assets/icons/on.png";

    `${event.target.src}`.includes("on.png")
        ? audio.play() : audio.pause();
});

function getRightPosition() { //pega a posição da direita para o personagem nao ultrapassar os limites da imagem de fundo
    return parseInt(ash.style.right.split("px")) || 2;
}
function getTopPosition() {
    return parseInt(ash.style.top.split("px")) || 2;
}

function verifyLookMonster() {
    if (
        getTopPosition() >= 2 &&
        getTopPosition() <= 98 &&
        getRightPosition() >= 130 &&
        getRightPosition() <= 216
    ) {
        Serpent.style.display = "block";
        return;
    }

    if (
        getTopPosition() >= 474 &&
        getTopPosition() <= 594 &&
        getRightPosition() <= 138 &&
        getRightPosition() >= 42
    ) {
        Crab.style.display = "block";
        return;
    }

    if (
        getTopPosition() >= 266 &&
        getTopPosition() <= 394 &&
        getRightPosition() >= 546 &&
        getRightPosition() <= 650
    ) {
        Skeleton.style.display = "block";
        return;
    }
}


//Se passa o tipo de evento e depois uma função de callback
// assim que ele pressionar a tecla (keyup seria quando soltar por ex)

body.addEventListener("keydown", (event) => {
    event.stopPropagation(); //impede que o evento se propague para outros elementos
    switch (event.code) {
        case "ArrowLeft":
            if (getRightPosition() < 1220) {
                ash.style.right = `${getRightPosition() + 8}px`;
                ash.src = "../assets/linnus-left.png";
            }
            break;

        case 'ArrowRight':
            if (getRightPosition() > 2) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = "../assets/linnus-right.png"
            }

            break;

        case 'ArrowDown':
            if (getTopPosition() < 625) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = "../assets/linnus-front.png"
            }

            break;

        case 'ArrowUp':
            if (getTopPosition() > 2) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = "../assets/linnus-back.png"
            }

            break;

        default:
            break;
    }

    verifyLookMonster();
});