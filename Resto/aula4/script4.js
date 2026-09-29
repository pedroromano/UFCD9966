const imagem = document.querySelector("#imagem");
const titulo = document.querySelector("#titulo");
const rodar = document.querySelector("#rodar");
const crescer = document.querySelector("#crescer");
const encolher = document.querySelector("#encolher");
const mudarCor = document.querySelector("#mudarCor");
const reiniciar = document.querySelector("#reiniciar");

//Definir variáveis para armazenar o estado atual da imagem
let angulo = 0;
let tamanho = 1;
let cor = 0;

function atualizar_imagem() {
    imagem.style.transform = `rotateX(${angulo/2}deg) rotateY(${angulo}deg) rotateZ(${angulo/2}deg) scale(${tamanho})`;
}

//rodar o objecto 
rodar.addEventListener("click", ()=>{
    angulo += 90;
    atualizar_imagem();
});

//crescer o objecto
crescer.addEventListener("click", ()=>{
    tamanho += 0.2;
    atualizar_imagem();
});

//encolher o objecto
encolher.addEventListener("click", ()=>{
    tamanho -= 0.2;
    atualizar_imagem();
});

//mudar a cor do objecto
mudarCor.addEventListener("click", ()=>{
    cor = (cor + 1) % 3; // alterna entre 0, 1 e 2
    if (cor === 0) {
        imagem.style.filter = "none";
        titulo.style.color = "#FFFFFF";
    } else if (cor === 1) {
        imagem.style.filter = "sepia(100%)";
        titulo.style.color = "#ffffff";
    } else {
        imagem.style.filter = "grayscale(100%)";
        titulo.style.color = "#000000";
    }
    atualizar_imagem();
}); 

//reiniciar o objecto
reiniciar.addEventListener("click", ()=>{
    angulo = 0;
    tamanho = 1;
    cor = 0;

    imagem.style.filter = "none";
    titulo.style.color = "#FFFFFF";

    atualizar_imagem();
});