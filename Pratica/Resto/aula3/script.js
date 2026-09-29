//alert("Bem-vindo ao laboratório de multimédia!");
/* Cria uma variável que seleciona o elemento com o id "titulo" */
const titulo = document.querySelector("#titulo");
/* Altera a cor do título para amarelo */
titulo.style.color = "yellow";
/* Altera o tamanho do título para 50px */
titulo.style.fontSize = "50px";
/* Altera o texto do título para "Laboratório de Multimédia - Exercício 3" */
titulo.innerHTML = "Laboratório de Multimédia - Exercício 3";

// Cria uma variável que seleciona o elemento com o id "imagem"
const imagem = document.querySelector("#imagem");

function rodar(){
    // Altera a rotação do elemento com o id "imagem" para 90°
    //imagem.style.transform = "rotate(90deg)";
    if(imagem.style.transform === "rotate(0deg)"){
        imagem.style.transform = "rotate(90deg)";
    }
    else if(imagem.style.transform === "rotate(90deg)"){
        imagem.style.transform = "rotate(180deg)";
    }
    else if(imagem.style.transform === "rotate(180deg)"){
        imagem.style.transform = "rotate(270deg)";
    }
    else if(imagem.style.transform === "rotate(270deg)"){
        imagem.style.transform = "rotate(360deg)";
    }
    else{
        imagem.style.transform = "rotate(0deg)";
    }
}

function crescer(){
    imagem.style.transform = "scale(1.5)";
}

function encolher(){
    imagem.style.transform = "scale(0.5)";
}

function mudarCor(){
    imagem.style.backgroundColor = "red";
    //imagem.style.filter = "grayscale(100%)";
}

function reiniciar(){
    imagem.style.transform = "rotate(0deg)";
    imagem.style.backgroundColor = "white";
    imagem.style.scale = "1";
}