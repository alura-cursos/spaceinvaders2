let imagemNave;
let posicaoNave;

function inicializarNave(){
    posicaoNave = createVector(400, 500);
}

function desenharNave(){
      //desenhar a nave
      image(imagemNave, posicaoNave.x, posicaoNave.y);
}

function movimentarNave(){
    //centralizando a posição da nave
    posicaoNave.x = mouseX - imagemNave.width / 2;
}