// INICIALIZANDO O FORMULARIO COM EVENTO DE CRIAR
const form = document.querySelector("#veiculo-form")
if (form) {
    form.addEventListener("submit", function (event) {
        submitFormCreate(event, this);
    });
}

// EVENTOS DE ENVIAR O FORMULARIO (criacao de veiculo)
async function submitFormCreate(event, form) {
    event.preventDefault();

    const botaoSalvar = document.getElementById('salvar');
    botaoSalvar.disabled = true;
    setTimeout(() => botaoSalvar.disabled = false, 2000);
    const jsonFormulario = criarJsonAPartirDoFormulario(form);
    const respostaDaApi = await chamarApiPost('http://localhost:3000/veiculos', jsonFormulario);
    if (respostaDaApi) {
        window.location.reload() // atualiza a tela
    } else {
        alert('Erro!')
    }
}

// FUNCAO DO BOTAO DE ATUALIZAR LISTA - ATUALIZA A TABELA COM OS VEICULOS QUE VOLTARAM DA API GET

async function atualizarLista() {
    const respostaDaApi = await chamarApiGet('http://localhost:3000/veiculos')
    criarTabelaComJson(respostaDaApi)
}

// ========================
// TABELA
// ========================
function criarTabelaComJson(respostaDaApiEmJson) {
    var tabela = document.querySelector("#automovel");
    for (var i = 0; i < respostaDaApiEmJson.length; i++) {
        var trVeiculo = criaTr(respostaDaApiEmJson[i]);
        tabela.appendChild(trVeiculo);
    }
}

function criaTr(veiculo) {
    var trVeiculo = document.createElement("tr");
    trVeiculo.classList.add("veiculo");

    var tdLocadora = criaTd(veiculo.locadora, ".info-locadora");
    var tdModelo = criaTd(veiculo.modelo, ".info-modelo");
    var tdMarca = criaTd(veiculo.marca, ".info-marca");
    var tdAno = criaTd(veiculo.ano, ".info-ano");
    var tdMotor = criaTd(veiculo.motor, ".info-motor");
    var tdPortas = criaTd(veiculo.portas, ".info-portas");
    var tdCambio = criaTd(veiculo.cambio, ".info-cambio");
    var tdArCondicionado = criaTd(veiculo.ar_condicionado, ".info-ar-condicionado");
    var tdBotaoApagar = criaTdBotaoApagar(veiculo.id)
    var tdBotaoEditar = criaTdBotaoEditar(veiculo.id)

    trVeiculo.appendChild(tdLocadora);
    trVeiculo.appendChild(tdModelo);
    trVeiculo.appendChild(tdMarca);
    trVeiculo.appendChild(tdAno);
    trVeiculo.appendChild(tdMotor);
    trVeiculo.appendChild(tdPortas);
    trVeiculo.appendChild(tdCambio);
    trVeiculo.appendChild(tdArCondicionado);
    trVeiculo.appendChild(tdBotaoApagar);
    trVeiculo.appendChild(tdBotaoEditar);

    return trVeiculo;
}

function criaTd(dado, classe) {
    var td = document.createElement("td");

    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function criaTdBotaoApagar(id) {
    var td = document.createElement("td");

    var botao = document.createElement("button")
    botao.type = "button"

    botao.textContent = "Apagar"

    botao.addEventListener("click", function (event) {
        event.preventDefault();
        apagarVeiculo(id);
    });

    td.appendChild(botao);

    return td;
}

function criaTdBotaoEditar(id) {
    var td = document.createElement("td");

    var botao = document.createElement("button")
    botao.type = "button"

    botao.textContent = "Editar"

    botao.addEventListener("click", function (event) {
        event.preventDefault();
        editarVeiculo(id);
    });

    td.appendChild(botao);

    return td;
}

// FUNCAO DO BOTAO DE APAGAR VEICULO

async function apagarVeiculo(id) {
    await chamarApiDelete('http://localhost:3000/veiculos/' + id)
    window.location.reload();
}

// FUNCAO DO BOTAO DE EDITAR VEICULO

async function editarVeiculo(id) {
    const resposta = await chamarApiGet('http://localhost:3000/veiculos/' + id) // encontrar veiculo que queremos editar
    const veiculo = resposta[0]

    const titulo = document.querySelector("#titulo")
    titulo.textContent = "Editar Veículo";

    // buscar formulario antigo
    var formulario = document.querySelector("#veiculo-form")

    // clonar o formulario para remover os event listeners
    formulario.replaceWith(formulario.cloneNode(true));

    // referenciar ao novo formulario
    formulario = document.querySelector("#veiculo-form")

    // popula o formulario novo com os dados do veiculo que estamos editando
    formulario.locadora.value = veiculo.locadora;
    formulario.modelo.value = veiculo.modelo;
    formulario.marca.value = veiculo.marca;
    formulario.ano.value = veiculo.ano;
    if (veiculo.motor == 1) {
        formulario.motor.value = '1.0';
    } else if (veiculo.motor == 2) {
        formulario.motor.value = '2.0';
    } else {
        formulario.motor.value = veiculo.motor;
    }
    formulario.portas.value = veiculo.portas;
    formulario.cambio.value = veiculo.cambio;
    if (veiculo.ar_condicionado == true) {
        formulario.ar_condicionado.value = 'on';
        formulario.ar_condicionado.checked = true;
    } else {
        formulario.ar_condicionado.value = 'off';
        formulario.ar_condicionado.checked = false;
    }
    formulario.veiculoId.value = id;

    formulario.addEventListener("submit", function (event) {
        enviarFormularioDeEditar(event, this);
    });
}

async function enviarFormularioDeEditar(event, form) {
    event.preventDefault();

    const botaoSalvarEdicao = document.getElementById('salvar');
    botaoSalvarEdicao.disabled = true;
    setTimeout(() => botaoSalvarEdicao.disabled = false, 2000);
    const jsonFormulario = criarJsonAPartirDoFormulario(form);
    const respostaDaApi = await chamarApiPut('http://localhost:3000/veiculos/' + form.veiculoId.value, jsonFormulario);
    if (respostaDaApi) {
        window.location.reload()
    } else {
        alert('Erro!')
    }
}



// =========================
// REST APIS
// =========================
// CHAMADAS DE APIS

async function chamarApiGet(link) {
    if (!link) {
        throw new Error("Falta o link a ser chamado.");
    }
    try {
        const respostaDaApi = await fetch(link, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const respostaDaApiEmJson = await respostaDaApi.json();
        return respostaDaApiEmJson;
    }
    catch (erro) {
        console.error(`Erro no GET: ${erro}`);
        throw erro;
    }
}

async function chamarApiPost(link, body) {
    if (!link || !body) {
        throw new Error("Link ou body do POST faltando.");
    }
    try {
        const respostaDaApi = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const respostaDaApiEmJson = await respostaDaApi.json();
        return respostaDaApiEmJson;
    }
    catch (erro) {
        console.error(`Erro chamando o POST: ${erro}`);
        throw erro;
    }
}

async function chamarApiPut(link, body) {
    if (!link || !body) {
        throw new Error("Link ou body do PUT faltando.");
    }
    try {
        const respostaDaApi = await fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const respostaDaApiEmJson = await respostaDaApi.json();
        return respostaDaApiEmJson;
    }
    catch (erro) {
        console.error(`Erro chamando o PUT: ${erro}`);
        throw erro;
    }
}

async function chamarApiDelete(link) {
    if (!link) {
        throw new Error("Link do DELETE faltando.");
    }
    try {
        const respostaDaApi = await fetch(link, {
            method: "DELETE",
        });
        const respostaDaApiEmJson = await respostaDaApi.json();
        return respostaDaApiEmJson;
    }
    catch (erro) {
        console.error(`Erro chamando o DELETE: ${erro}`);
        throw erro;
    }
}

// CRIAR JSON A PARTIR DO FORMULARIO

function criarJsonAPartirDoFormulario(form) {
    const jsonFormData = {};

    jsonFormData["id"] = gerarId(50);

    var arCondicionadoSelecionado = false
    for (const pair of new FormData(form)) {
        if (pair[0] == 'ar_condicionado') {
            if (pair[1] == 'on') {
                jsonFormData[pair[0]] = true;
                arCondicionadoSelecionado = true
            }
        } else if (pair[0] != 'veiculoId') {
            jsonFormData[pair[0]] = pair[1];
        }
    }
    if (!arCondicionadoSelecionado) {
        jsonFormData['ar_condicionado'] = false;
    }
    return jsonFormData;
}

// GERADOR DE ID ALEATORIO
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function gerarId(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}