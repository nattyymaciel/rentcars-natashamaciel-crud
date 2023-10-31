
var veiculo = document.querySelector(".veiculo");
var locadora;
var modelo;
var marca;
var ano;
var motor;
var portas;
var cambio;
var ar_condicionado;

console.log(veiculo);

var tdPortas = veiculo.querySelector(".info-portas");
console.log(tdPortas); //para exibir na inspeção do html o conteudo
portas=tdPortas.textContent;
console.log(portas);

//logica de validação aqui para usar no HTML
if(portas!=2 && portas!=4){
    console.log("Valor inválido");
}else{
    console.log("Valor válido.")
}