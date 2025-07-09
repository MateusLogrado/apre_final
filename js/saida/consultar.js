let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
    e.preventDefault()

    let codSaida = Number(document.getElementById("id").value)

    res.innerHTML = `<table>
    <tr>
      <th>Nome</th>
      <th>Sobrenome</th>
      <th>Matricula</th>
      <th>Telefone</th>
      <th>Email</th>
    </tr>`

    res.innerHTML = ""

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
        .then(resp => resp.json())
        .then(val => {
            res.innerHTML = `<table>
          <tr>
            <th>Data da Solicitação</th>
            <th>Hora de Saída</th>
            <th>Hora de Retorno</th>
            <th>Motivo</th>
            <th>Destino</th>
            <th>Status</th>
            <th>Aluno</th>
            <th>Professor</th>
          </tr>
          <tr>             
            <td>${val.dataSolicitacao}</td>
            <td>${val.horaSaida}</td>
            <td>${val.horaRetorno}</td>
            <td>${val.motivo}</td>
            <td>${val.localDestino}</td>
            <td>${val.status}</td>
            <td>${val.nomeAluno}</td>
            <td>${val.nomeProfessor}</td>
          </tr>
            </table>`
        })
    .catch((err)=>{
        console.error("Erro: ", err)
    })
})