let imagemLaser;
let velocidadeLaser = 5;
let lasers = new Array();

function verificaColisaoLaser(){
    for(let laser of lasers){
        if(colidiu(laser, imagemLaser,posicaoNave, imagemNave )){
            //ir para cena de derrota
            cenaAtual = cenas.derrota;
        }
    }
}

function desenhaLasers() {
    for (let laser of lasers) {
        image(imagemLaser, laser.x, laser.y);
    }
}

function movimentaLasers() {
    for (let laser of lasers) {
        laser.y = laser.y + velocidadeLaser;
    }
}