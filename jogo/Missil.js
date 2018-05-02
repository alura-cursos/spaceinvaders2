let velocidadeMissil = 5;
let posicoesMisseis = new Array();
let imagemMissil;

function movimentaMisseis() {
    //para cada posicao dentro da lista de posições -> mover o míssil para cima
    for (let posicao of posicoesMisseis) {
        posicao.y = posicao.y - velocidadeMissil;
    }
}

function desenhaMisseis() {
    //para cada item da minha lista -> desenhar aquele ator
    for (let posicao of posicoesMisseis) {
        image(imagemMissil, posicao.x, posicao.y);
    }
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