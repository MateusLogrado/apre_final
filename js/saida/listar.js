let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
    e.preventDefault()
    let listaOnline = document.getElementById("listaOnline").value

    switch (listaOnline) {
        case "todos":
            todos()
            break
        case "pendente":
            listarPorStatus()
            break
        case "fora":
            listarPorStatus()
            break
        case "finalizado":
            listarPorStatus()
            break
        case "rejeitado":
            listarPorStatus()
            break
    }
})

function todos() {
    fetch("http://localhost:8081/saida", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(valores => {
        let html = `<table>
            <tr>
                <th>Código</th>
                <th>Data da Solicitação</th>
                <th>Hora de Saída</th>
                <th>Hora de Retorno</th>
                <th>Motivo</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Aluno</th>
                <th>Professor</th>
            </tr>`
        
        valores.forEach(val => {
            html += `<tr>
                <td>${val.codSaida}</td>               
                <td>${val.dataSolicitacao}</td>
                <td>${val.horaSaida}</td>
                <td>${val.horaRetorno}</td>
                <td>${val.motivo}</td>
                <td>${val.localDestino}</td>
                <td>${val.status}</td>
                <td>${val.nomeAluno}</td>
                <td>${val.nomeProfessor}</td>
            </tr>`
        })

        html += `</table>`
        res.innerHTML = html
    })
    .catch(err => {
        console.error("Erro:", err)
    })
}

function listarPorStatus() {
    fetch("http://localhost:8081/saida", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(valores => {
        let html = `<table>
            <tr>
                <th>Código</th>
                <th>Data da Solicitação</th>
                <th>Hora de Saída</th>
                <th>Hora de Retorno</th>
                <th>Motivo</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Aluno</th>
                <th>Professor</th>
                <th>Ações</th>
            </tr>`;
    
        valores.forEach(val => {
            if (val.status === "pendente") {
                html += `<tr>
                    <td>${val.codSaida}</td>               
                    <td>${val.dataSolicitacao}</td>
                    <td>${val.horaSaida}</td>
                    <td>${val.horaRetorno}</td>
                    <td>${val.motivo}</td>
                    <td>${val.localDestino}</td>
                    <td>${val.status}</td>
                    <td>${val.nomeAluno}</td>
                    <td>${val.nomeProfessor}</td>
                    <td>
                        <button id="aprovar">Aprovar</button>
                        <button id="rejeitar">Rejeitar</button>
                    </td>
                </tr>`;
            }
        });
    
        html += `</table>`;
        res.innerHTML = html;
    })
    
    .catch(err => {
        console.error("Erro:", err)
    })
}
