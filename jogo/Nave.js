const tempoEntreDisparos = .8; //tempo em segundos
let imagemNave;
let posicaoNave;
let possoAtirar;
let cronometroRecarregar = tempoEntreDisparos;

function inicializarNave(){
    possoAtirar = true;
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

function atirar(){
    if(possoAtirar == true){
        posicoesMisseis.push(createVector(mouseX - imagemMissil.width / 2, posicaoNave.y));
        possoAtirar = false;
    }
}

function recarregarMissil(){
    if(possoAtirar == false){
        cronometroRecarregar = cronometroRecarregar-deltaTime;
        if(cronometroRecarregar < 0){
            possoAtirar = true;
            cronometroRecarregar = tempoEntreDisparos;
        }
    }
}