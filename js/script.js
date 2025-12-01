//se usa:
//. classe
//# id
//nome do elemento
//div h1 => elemento dentro de outro elemento

//querySelector => seleciona apenas um elemento (o primeiro que ele encontrar)
//querySelectorAll => seleciona todos os elementos que correspondem e coloca dentro de um array


const body = document.querySelector("body");
const game = document.querySelector(".game");

const count = document.querySelector("h1");
const reset = document.querySelector("#reset");

const ash = document.querySelector("#ash");

const Serpent = document.querySelector("#Serpent");
const Skeleton = document.querySelector("#Skeleton");
const Crib = document.querySelector("#Crib");

let findSerpent = false;
let findSkeleton = false;
let findCrab = false;

const audio = document.querySelector("audio");
audio.volume = 0.4; //volume de 0 a 1

const musicControl = document.querySelector(".music-control");

musicControl.addEventListener("click", (event) => {
    event.stopPropagation()

    const isOn = event.target.src.includes("on.png");

    event.target.src = isOn
        ? "./assets/icons/off.png"
        : "./assets/icons/on.png";

    isOn ? audio.pause() : audio.play();
});

reset.addEventListener("click", () => {
    window.location.reload();
    reset.style.display = "none";
})

function clearCharactersAndFinishGame() {
    Serpent.style.display = "none";
    Skeleton.style.display = "none";
    Crab.style.display = "none";
    ash.style.display = "none";

    reset.style.display = "block";
    count.textCount = "";
}

let currentCount = 60;

const interval = setInterval(() => {
    if (currentCount <= 0) {
        game.style.backgroundImage = "url('../assets/mary keller.jpg')";

        clearCharactersAndFinishGame();
        clearInterval(interval);
        return;
    }

    currentCount--;
    count.textContent = currentCount;
}, 1000);

function finishGame() {
    if (findSerpent && findSkeleton && findCrab) {
        clearCharactersAndFinishGame();

        const timeOut = setTimeout(() => {
            game.style.backgroundImage = "url('../assets/linnus-ending.jpg')";

            clearInterval(interval);
            clearTimeout(timeOut);

            audio.pause();
        }, 800);
    }
}

function getRightPosition() { //pega a posição da direita para o personagem nao ultrapassar os limites da imagem de fundo
    return parseInt(ash.style.right.split("px")) || 2;
}
function getTopPosition() {
    return parseInt(ash.style.top.split("px")) || 2;
}

function verifyLookMonster(to) {
    finishGame();

    const monsterRightPosition =
        to === "ArrowLeft"
            ? `${getRightPosition() - 64}px`
            : `${getRightPosition() + 64}px`

    if (findSerpent) {
        const newTopPosition =
            to = "ArrowUp"
                ? `${getTopPosition() + 8}px`
                : `${getTopPosition() - 8}px`

        Serpent.style.top = newTopPosition;
        Serpent.style.right = monsterRightPosition;

    }

    if (findSkeleton) {
        const newTopPosition =
            to = "ArrowUp"
                ? `${getTopPosition() + 36}px`
                : `${getTopPosition() - 36}px`

        Skeleton.style.top = newTopPosition;
        Skeleton.style.right = monsterRightPosition;

    }

    if (findCrab) {
        const newTopPosition =
            to = "ArrowUp"
                ? `${getTopPosition() + 72}px`
                : `${getTopPosition() - 72}px`

        Crab.style.top = newTopPosition;
        Crab.style.right = monsterRightPosition;

    }

    if (
        getTopPosition() >= 2 &&
        getTopPosition() <= 98 &&
        getRightPosition() >= 130 &&
        getRightPosition() <= 216
    ) {
        Serpent.style.display = "block";
        findSerpent = true;
        return;
    }

    if (
        getTopPosition() >= 474 &&
        getTopPosition() <= 594 &&
        getRightPosition() <= 138 &&
        getRightPosition() >= 42
    ) {
        Crab.style.display = "block";
        findCrab = true;
        return;
    }

    if (
        getTopPosition() >= 266 &&
        getTopPosition() <= 394 &&
        getRightPosition() >= 546 &&
        getRightPosition() <= 650
    ) {
        Skeleton.style.display = "block";
        findSkeleton = true;
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
                ash.src = "./assets/linnus-left.png";
            }
            break;

        case 'ArrowRight':
            if (getRightPosition() > 2) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = "./assets/linnus-right.png"
            }

            break;

        case 'ArrowDown':
            if (getTopPosition() < 625) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = "./assets/linnus-front.png"
            }

            break;

        case 'ArrowUp':
            if (getTopPosition() > 2) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = "./assets/linnus-back.png"
            }

            break;

        default:
            break;
    }

    verifyLookMonster();
});