
var form = document.querySelector('#form-adiciona');
//evento que ao apertar o botao, os dados digitados serão salvos na tabela
var botaoAdiciona = document.querySelector('#salvar');
botaoAdiciona.addEventListener("click", function(event){
    event.preventDefault();
    var formulario = document.querySelector('#form-adiciona');

    var veiculo = obtemVeiculoDoFormulario(formulario);

    var trVeiculo = criaTr(veiculo);

    var tabela = document.querySelector("#automovel");
    tabela.appendChild(trVeiculo);

    formulario.reset();

})

function obtemVeiculoDoFormulario(form){
    var veiculo ={
        locadora: form.locadora.value,//String
        modelo: form.modelo.value,//String
        marca: form.marca.value,//String
        ano: form.ano.valoe,//Number.parseInt
        motor: form.motor.value,//Number.parseFloat
        portas: form.portas.value,//Number.parseInt
        cambio: form.cambio.value,//String
        ar_condicionado: form.ar_condicionado.value//boolean
    }
    return veiculo;
}

function criaTr(veiculo){
    var trVeiculo = document.createElement("tr");
    trVeiculo.classList.add("veiculo");

    var tdLocadora = criaTd(veiculo.locadora,".info-locadora" );
    var tdModelo = criaTd(veiculo.modelo,".info-modelo");
    var tdMarca = criaTd(veiculo.marca,".info-marca");
    var tdAno = criaTd(veiculo.ano, ".info-ano");
    var tdMotor = criaTd(veiculo.motor, ".info-motor");
    var tdPortas = criaTd(veiculo.portas,".info-portas");
    var tdCambio = criaTd(veiculo.cambio, ".info-cambio");
    var tdArCondicionado = criaTd(veiculo.ar_condicionado, ".info-ar-condicionado");

    trVeiculo.appendChild(tdLocadora);
    trVeiculo.appendChild(tdModelo);
    trVeiculo.appendChild(tdMarca);
    trVeiculo.appendChild(tdAno);
    trVeiculo.appendChild(tdMotor);
    trVeiculo.appendChild(tdPortas);
    trVeiculo.appendChild(tdCambio);
    trVeiculo.appendChild(tdArCondicionado);

    
    return trVeiculo;
}

function criaTd(dado,classe){
    var td = document.createElement("td");

    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

/*for(var i; i<veiculo.length; i++){
    var automovel = veiculo[i];
    var cria = criaTd();

}*/