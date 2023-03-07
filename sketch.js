// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;


// variaveis velocidade da bolinha 
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

let colidiu = false;

let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis da raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// variáveis placar do jogo
let pontosJogador = 0;
let pontosOponente = 0;

// sons do jogo
let trilha;
let raquetada;
let ponto;

function preload() {
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
  
}

function movimentaRaquete() {
  if (keyIsDown(87)) {
      yRaquete -= 10;
  }
  if (keyIsDown(83)) {
      yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento &&
      yBolinha - raio < yRaquete + raqueteAltura &&
      yBolinha + raio > yRaquete) {
      velocidadeXBolinha *= -1;
      raquetada.play();
  }
}

function colisaoRaquete(x, y) {
  colidiu =
    collideRectCircle(x, y, raqueteComprimento,
                    raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
      yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
      yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(15);
  fill(color(255, 140, 0));
  rect(180, 10, 40, 20);
  fill(color(255, 140, 0));
  fill(255);
  text(pontosJogador, 200, 26);
  fill(color(255, 140, 0));
  rect(380, 10, 40, 20);
  fill(255);
  text(pontosOponente, 400, 26);
}

function marcaPonto() {
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
  if (xBolinha > 590) {
    pontosJogador += 1;
    ponto.play();
  }
}
