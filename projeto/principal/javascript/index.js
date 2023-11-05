const form = document.querySelector("#veiculo-form")
if (form) {
    form.addEventListener("submit", function (event) {
        submitFormCreate(event, this);
    });
}

async function submitFormCreate(event, form) {
    event.preventDefault();

    const btnSubmit = document.getElementById('salvar');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    const jsonFormData = buildJsonFormData(form);
    const headers = buildHeaders();
    const response = await performPostHttpRequest('http://localhost:3000/veiculos', headers, jsonFormData);
    console.log(response)
    if (response) {
        window.location.reload()
    } else {
        alert('Error')
    }
}

async function submitFormEdit(event, form) {
    event.preventDefault();

    const btnSubmit = document.getElementById('salvar');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    const jsonFormData = buildJsonFormData(form);
    const headers = buildHeaders();
    const response = await performPutHttpRequest('http://localhost:3000/veiculos/' + form.veiculoId.value, headers, jsonFormData);
    console.log(response)
    if (response) {
        window.location.reload()
    } else {
        alert('Error')
    }
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateId(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function buildJsonFormData(form) {
    const jsonFormData = {};

    jsonFormData["id"] = generateId(50);

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

function buildHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };
    return headers;
}





async function performGetHttpRequest(fetchLink, headers, query = null) {
    if (!fetchLink || !headers) {
        throw new Error("One or more GET request parameters was not passed.");
    }
    try {
        const rawResponse = await fetch(fetchLink, {
            method: "GET",
            headers: headers,
            query: (query != null) ? query : ""
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (err) {
        console.error(`Error at fetch GET: ${err}`);
        throw err;
    }
}

async function performPostHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
        throw new Error("One or more POST request parameters was not passed.");
    }
    try {
        const rawResponse = await fetch(fetchLink, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (err) {
        console.error(`Error at fetch POST: ${err}`);
        throw err;
    }
}

async function performPutHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
        throw new Error("One or more POST request parameters was not passed.");
    }
    try {
        const rawResponse = await fetch(fetchLink, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (err) {
        console.error(`Error at fetch PUT: ${err}`);
        throw err;
    }
}

async function performDeleteHttpRequest(fetchLink) {
    if (!fetchLink) {
        throw new Error("One or more DELETE request parameters was not passed.");
    }
    try {
        const rawResponse = await fetch(fetchLink, {
            method: "DELETE",
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (err) {
        console.error(`Error at fetch DELETE: ${err}`);
        throw err;
    }
}

async function atualizarLista() {
    const content = await performGetHttpRequest('http://localhost:3000/veiculos', buildHeaders())
    createTableFromJson(content)
}

function createTableFromJson(jsonData) {
    var tabela = document.querySelector("#automovel");
    for (var i = 0; i < jsonData.length; i++) {
        var trVeiculo = criaTr(jsonData[i]);
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

async function apagarVeiculo(id) {
    console.log("Apagando o veiculo " + id);
    await performDeleteHttpRequest('http://localhost:3000/veiculos/' + id)
    window.location.reload();
}

async function editarVeiculo(id) {
    console.log("Editando o veiculo " + id);

    const resposta = await performGetHttpRequest('http://localhost:3000/veiculos/' + id, buildHeaders())
    const veiculo = resposta[0]

    form.replaceWith(form.cloneNode(true));

    const formEdit = document.querySelector("#veiculo-form")

    formEdit.locadora.value = veiculo.locadora;
    formEdit.modelo.value = veiculo.modelo;
    formEdit.marca.value = veiculo.marca;
    formEdit.ano.value = veiculo.ano;
    if (veiculo.motor == 1) {
        formEdit.motor.value = '1.0';
    } else if (veiculo.motor == 2) {
        formEdit.motor.value = '2.0';
    } else {
        formEdit.motor.value = veiculo.motor;
    }
    formEdit.portas.value = veiculo.portas;
    formEdit.cambio.value = veiculo.cambio;
    if (veiculo.ar_condicionado == true) {
        formEdit.ar_condicionado.value = 'on';
        formEdit.ar_condicionado.checked = true;
    } else {
        formEdit.ar_condicionado.value = 'off';
        formEdit.ar_condicionado.checked = false;
    }
    formEdit.veiculoId.value = id;

    formEdit.addEventListener("submit", function (event) {
        submitFormEdit(event, this);
    });
}