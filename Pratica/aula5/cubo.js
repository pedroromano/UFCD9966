const cubo = document.querySelector('#cubo');
const cenario = document.querySelector('#cenario');
const controlo = document.querySelector('#controlo');
const pausa = document.querySelector('#pausa');
const aumentar = document.querySelector('#aumentar');
const diminuir = document.querySelector('#diminuir');
const rapido = document.querySelector('#rapido');
const lento = document.querySelector('#lento');
const normal = document.querySelector('#normal');
const reiniciar = document.querySelector('#reiniciar');

//definir e inicializar as variáveis
let parado = false;
let pp = 800; //perpectiva

//definir as funções
pausa.addEventListener('click', () => {
    parado = !parado;
    cubo.style.animationPlayState = parado ? 'paused' : 'running';
    pausa.textContent = parado ? 'Continuar' : 'Pausar';
});

aumentar.addEventListener('click', () => {
    pp += 100;
    cenario.style.perspective = `${pp}px`;
});

diminuir.addEventListener('click', () => {
    pp = Math.max(200, pp - 100);  //Para evitar valor negativo e sair do ecrã
    cenario.style.perspective = `${pp}px`;
});

rapido.addEventListener('click', () => {
    cubo.style.animationDuration = '1s';
});

lento.addEventListener('click', () => {
    cubo.style.animationDuration = '12s';
});

normal.addEventListener('click', () => {
    cubo.style.animationDuration = '8s';
});

reiniciar.addEventListener('click', () => {
    pp = 800;
    cenario.style.perspective = `${pp}px`;
    parado = false;
    cubo.style.animationPlayState = 'running';
    pausa.textContent = 'Pausar';
    cubo.style.animationDuration = '8s';
});