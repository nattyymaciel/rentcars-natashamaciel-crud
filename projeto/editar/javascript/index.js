async function getVeiculo(id) {
    const veiculos = await performGetHttpRequest('http://localhost:3000/veiculos/' + id, buildHeaders())
    const veiculo = veiculos[0]
    
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