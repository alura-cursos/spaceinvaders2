let chanceDeAtirar = 0.005;

let imagemNave;
let imagemMissil;
let imagemLaser;

let imagensAlien = new Array();
let posicoesMisseis = new Array();
let lasers = new Array();
let aliens = new Array();

let posicaoNave;
let deslocamentoAlien = 0;

let alienVivo = true;
let estaTocando;

let quantidadeAliens = 5;
let velocidadeAlien = 2;
let velocidadeMissil = 5;
let pontuacao = 0;

let trilhaSonora;

//preparando o ambiente de trabalho
//carrengado as fantasias do nosso jogo
function preload() {
    // carregando imagens

    trilhaSonora = loadSound("audio/Trilha.mp3");
    imagemNave = loadImage("imagens/Nave.png");
    imagemLaser = loadImage("imagens/laser.png")
    imagemMissil = loadImage("imagens/Missil.png");

    imagensAlien.push(loadImage("imagens/Alien1.png"));
    imagensAlien.push(loadImage("imagens/Alien2.png"));
    imagensAlien.push(loadImage("imagens/Alien3.png"));

    lasers.push(createVector(100, 500));
}

//Quando meu jogo começa
function setup() {
    // criando um palco com 900 de largura e 600 de altura
    createCanvas(900, 600);
    posicaoNave = createVector(400, 500);
    //trilhaSonora.loop();

    for (let i = 0; i < quantidadeAliens; i = i + 1) {
        //faça algo
        let numeroFantasia = Math.floor(random(imagensAlien.length));
        aliens.push(numeroFantasia);
    }

}

//desenhando nosso atores - igual ao bloco "sempre" do scracth
function draw() {

    // pintar o fundo do palco de cinza
    background(100);
    if (todosAliensEstaoMortos()) {
        textSize(80);
        textAlign(CENTER);
        text("Parabéns", width / 2, height / 2);
    } else {
        movimentaMisseis();
        //centralizando a posição da nave
        posicaoNave.x = mouseX - imagemNave.width / 2;
        //desenhar a nave
        image(imagemNave, posicaoNave.x, posicaoNave.y);

        verificaColisaoMissil();
        verificaColisaoLaser();
        movimentarAlien();
        desenhaAlien();
        desenhaMisseis();
        adicionarDisparosDosAliens();
        movimentaLasers();
        desenhaLasers();
        fill(255);
        textSize(30);
        text("Pontuação: " + pontuacao, 10, 80);

    }

}
//quando o mouse for pressionado
function mousePressed() {
    posicoesMisseis.push(createVector(mouseX - imagemMissil.width / 2, posicaoNave.y));

}

function verificaColisaoMissil() {
    //para cada missil dentro do jogo
    for (let posicao of posicoesMisseis) {
        //verficar a colisao com todos os aliens
        for (let i = 0; i < quantidadeAliens; i = i + 1) {
            let posicaoAlienDaLista = calcularPosicaoAlien(i);
            let numeroFantasia = aliens[i];
            if (alienEstaMorto(numeroFantasia) == false) {
                let imagemAlien = imagensAlien[numeroFantasia];
                //se o missil está para esquerda OU (||)  para direita OU  para baixo OU para cima
                if (colidiu(posicao, imagemMissil, posicaoAlienDaLista, imagemAlien)) {
                    //o alien está morto
                    aliens[i] = -1;
                    pontuacao = pontuacao + 10;
                }
            }
        }
    }
}

function verificaColisaoLaser(){
    for(let laser of lasers){
        if(colidiu(laser, imagemLaser,posicaoNave, imagemNave )){
            console.log("Perdeu");
        }
    }
}

function colidiu(posicaoObjeto, imagemObjeto, posicaOutro, imagemOutro) {
    if ((posicaoObjeto.x + imagemObjeto.width < posicaOutro.x ||
        posicaoObjeto.x > posicaOutro.x + imagemOutro.width ||
        posicaoObjeto.y > posicaOutro.y + imagemOutro.height ||
        posicaoObjeto.y + imagemObjeto.height < posicaOutro.y)) {
        return false;
    }
    return true
}
function desenhaAlien() {
    for (let i = 0; i < quantidadeAliens; i = i + 1) {
        let numeroFantasia = aliens[i];
        //se o numero da fantasia for diferente(!=) de -1 
        if (alienEstaMorto(numeroFantasia) == false) {
            //desenha o alien
            let posicao = calcularPosicaoAlien(i);
            image(imagensAlien[numeroFantasia], posicao.x, posicao.y);
        }
    }
}


function movimentarAlien() {
    deslocamentoAlien = deslocamentoAlien + velocidadeAlien;
    let posicaoUltimoAlien = calcularPosicaoAlien(quantidadeAliens - 1);
    let posicaoPrimeiroAlien = calcularPosicaoAlien(0);
    let imagemUltimoAlien = imagensAlien[0];
    if (posicaoUltimoAlien.x + imagemUltimoAlien.width > 900 || posicaoPrimeiroAlien.x < 0) {
        velocidadeAlien = velocidadeAlien * -1;
    }
}

function desenhaMisseis() {
    //para cada item da minha lista -> desenhar aquele ator
    for (let posicao of posicoesMisseis) {
        image(imagemMissil, posicao.x, posicao.y);
    }
}

function desenhaLasers() {
    for (let laser of lasers) {
        image(imagemLaser, laser.x, laser.y);
    }
}

function movimentaLasers() {
    for (let laser of lasers) {
        laser.y = laser.y + velocidadeMissil;
    }
}

function movimentaMisseis() {
    //para cada posicao dentro da lista de posições -> mover o míssil para cima
    for (let posicao of posicoesMisseis) {
        posicao.y = posicao.y - velocidadeMissil;
    }
}

function calcularPosicaoAlien(indiceAlien) {
    let posicao = createVector();
    posicao.x = indiceAlien * 100 + deslocamentoAlien;
    posicao.y = 150;
    return posicao;
}

function alienEstaMorto(fantasia) {
    return fantasia == -1;
}

function todosAliensEstaoMortos() {
    for (let alien of aliens) {
        if (alienEstaMorto(alien) == false) {
            return false;
        }
    }
    return true;
}

function adicionarDisparosDosAliens() {
    for (let i = 0; i < quantidadeAliens; i++) {
        if (alienEstaMorto(aliens[i]) == true) {
            continue;
        }

        if (deveAtirar()) {
            let posicaoAlien = calcularPosicaoAlien(i);
            lasers.push(posicaoAlien);
        }
    }
}

function deveAtirar() {
    return Math.random() < chanceDeAtirar;
}