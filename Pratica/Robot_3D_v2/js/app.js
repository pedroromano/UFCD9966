import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const robo = new THREE.Group();
scene.add(robo);

// MESH
function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// CORPO
const corpo = mesh(new THREE.BoxGeometry(1.6, 2, 0.9), 0x1717FF);
robo.add(corpo);

// CABEÇA
const cabeca = mesh(new THREE.BoxGeometry(1.8, 1.05, 1), 0xFFFF00);
cabeca.position.y = -1.65; // posição do cabeça passa para baixo
robo.add(cabeca);

// BRAÇOS
const bracoE = mesh(new THREE.BoxGeometry(0.35, 2.8, 0.4), 0xF2D3AC);
bracoE.position.set(-1.1, 0.05, 0);
const bracoD = bracoE.clone();
bracoD.position.x = 1.2;
robo.add(bracoE, bracoD);

// PERNAS
const pernaE = mesh(new THREE.BoxGeometry(0.5, 1.5, 0.55), 0xFF5C00);
pernaE.position.set(-0.48, -1.75, 0);
const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// OLHOS
const olhoE = mesh(new THREE.SphereGeometry(0.35, 16, 8), 0x111111);
olhoE.position.set(-3, 1.75, 0.51); // posição do olho esquerdo desloca-se para a esquerda para fora do corpo
const olhoD = olhoE.clone();
olhoD.position.x = 0.4;
robo.add(olhoE, olhoD);

// BOCA
const boca = mesh(new THREE.BoxGeometry(0.8, 0.2, 0.3), 0xff0000);
boca.position.set(0, -0.30, 0.51);
cabeca.add(boca);

// ANTENA
const haste = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 60), 0xe2e8f0);
haste.position.y = 2.55;
const ponta = mesh(new THREE.SphereGeometry(0.14, 16, 8), 0xef4444);
ponta.position.y = 2.95;
robo.add(haste, ponta);

let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);
  if (!pausado) {
    robo.rotation.y += 0.8 * velocidade; // aumenta consideravelmente a velocidade de rotação do robô
    tempo += 0.05 * velocidade;
    if (acenar){
      bracoD.rotation.x = Math.sin(tempo) * 0.8;
      bracoE.rotation.x = Math.sin(tempo) * (-0.8);
      pernaD.rotation.x = Math.sin(tempo) * 0.8;
      pernaE.rotation.x = Math.sin(tempo) * (-0.8);
      corpo.rotation.y = Math.sin(tempo) * 0.8;
    }
  }
  renderer.render(scene, camera);
}
animar();

document.querySelector("#pausa").onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};
document.querySelector("#lento").onclick = () => velocidade = 0.4;
document.querySelector("#normal").onclick = () => velocidade = 1;
document.querySelector("#rapido").onclick = () => velocidade = 2.5;
document.querySelector("#acenar").onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar){
    bracoD.rotation.y = 0;
    bracoE.rotation.y = 0;
    pernaD.rotation.y = 0;
    pernaE.rotation.y = 0;
    corpo.rotation.y = 0;
  } 
};
document.querySelector("#reset").onclick = () => {
  velocidade=1; pausado=false; acenar=false; tempo=0;
  robo.rotation.set(0,0,0); bracoD.rotation.set(0,0,0);
  bracoE.rotation.set(0,0,0); pernaD.rotation.set(0,0,0);
  pernaE.rotation.set(0,0,0); corpo.rotation.set(0,0,0);
  document.querySelector("#pausa").textContent="Pausar";
  document.querySelector("#acenar").textContent="Acenar";
};
addEventListener("resize", () => {
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});