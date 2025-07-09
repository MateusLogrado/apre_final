let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
    e.preventDefault()



    fetch("http://localhost:8081/saida", {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            let html = `<table>
          <tr>
            <th>Codigo</th>
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
                html += `          <tr>
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
            });
        
            html += `</table>`
            res.innerHTML = html
        })
    .catch((err)=>{
        console.error("Erro: ", err)
    })
})