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

const somAcenar = new Audio("./media/You_Spin_Me_Round.mp3");

// MESH
function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// CORPO
const corpo = mesh(new THREE.BoxGeometry(1.6, 2, 0.9), 0x1717FF);
robo.add(corpo);

// CABEÇA
const cabeca = mesh(new THREE.BoxGeometry(1.8, 1.05, 1), 0xFFFF00);
cabeca.position.y = 1.65;
robo.add(cabeca);

// --- BRAÇO DIREITO ARTICULADO ---
const ombroD = new THREE.Group();
ombroD.position.set(1.2, 0.05, 0);
robo.add(ombroD);

const bracoSuperiorD = mesh(new THREE.BoxGeometry(0.35, 1.4, 0.4), 0xF2D3AC);
bracoSuperiorD.position.y = 0;
ombroD.add(bracoSuperiorD);

const cotoveloD = new THREE.Group();
cotoveloD.position.y = -0.7;
ombroD.add(cotoveloD);

const antebracoD = mesh(new THREE.BoxGeometry(0.35, 1.4, 0.4), 0xF2D3AC);
antebracoD.position.y = -0.7;
cotoveloD.add(antebracoD);


// --- BRAÇO ESQUERDO ARTICULADO ---
const ombroE = new THREE.Group();
ombroE.position.set(-1.2, 0.05, 0);
robo.add(ombroE);

const bracoSuperiorE = mesh(new THREE.BoxGeometry(0.35, 1.4, 0.4), 0xF2D3AC);
bracoSuperiorE.position.y = 0;
ombroE.add(bracoSuperiorE);

const cotoveloE = new THREE.Group();
cotoveloE.position.y = -0.7;
ombroE.add(cotoveloE);

const antebracoE = mesh(new THREE.BoxGeometry(0.35, 1.4, 0.4), 0xF2D3AC);
antebracoE.position.y = -0.7;
cotoveloE.add(antebracoE);


// PERNAS
const pernaE = mesh(new THREE.BoxGeometry(0.5, 1.5, 0.55), 0xFF5C00);
pernaE.position.set(-0.48, -1.75, 0);
const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// OLHOS
const olhoE = mesh(new THREE.SphereGeometry(0.35, 16, 8), 0x111111);
olhoE.position.set(-0.4, 1.85, 0.51);
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
    robo.rotation.y += 0.01 * velocidade; 
    tempo += 0.05 * velocidade;
    
    if (acenar){
      // 1. Levantar os braços através dos ombros (valores em radianos para cima)
      ombroD.rotation.z = -3.5; 
      ombroE.rotation.z = 3.5;  

      // 2. Acenar com os antebraços a partir dos cotovelos
      cotoveloD.rotation.z = Math.sin(tempo) * 0.8;
      cotoveloE.rotation.z = Math.sin(tempo) * (-0.8);
      
      pernaD.rotation.x = Math.sin(tempo) * 0.8;
      pernaE.rotation.x = Math.sin(tempo) * (-0.8);
      corpo.rotation.y = Math.sin(tempo) * 0.4;
      cabeca.rotation.y = Math.sin(tempo) * 0.4;

      // 3. Reproduzir som quando acenar
      somAcenar.play().catch(e => console.log("Erro ao reproduzir som"));
      somAcenar.loop = true;

    } else {
      // Repor os ombros à posição normal quando parar de acenar
      ombroD.rotation.set(0, 0, 0);
      ombroE.rotation.set(0, 0, 0);

      somAcenar.pause();
      somAcenar.currentTime = 0;
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
    ombroD.rotation.set(0, 0, 0);
    ombroE.rotation.set(0, 0, 0);
    cotoveloD.rotation.set(0, 0, 0);
    cotoveloE.rotation.set(0, 0, 0);
    pernaD.rotation.set(0, 0, 0);
    pernaE.rotation.set(0, 0, 0);
    corpo.rotation.set(0, 0, 0);
    cabeca.rotation.set(0, 0, 0);
    somAcenar.pause();
    somAcenar.currentTime = 0;
  } 
};

document.querySelector("#reset").onclick = () => {
  velocidade = 1; pausado = false; acenar = false; tempo = 0;
  robo.rotation.set(0, 0, 0); 
  ombroD.rotation.set(0, 0, 0);
  ombroE.rotation.set(0, 0, 0);
  cotoveloD.rotation.set(0, 0, 0);
  cotoveloE.rotation.set(0, 0, 0);
  pernaD.rotation.set(0, 0, 0);
  pernaE.rotation.set(0, 0, 0); 
  corpo.rotation.set(0, 0, 0);
  document.querySelector("#pausa").textContent = "Pausar";
  document.querySelector("#acenar").textContent = "Acenar";
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight; 
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});