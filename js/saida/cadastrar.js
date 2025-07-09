let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
e.preventDefault()

    const formatoData = new Date().toISOString().slice(0, 10)

    let horaSaida = document.getElementById("horaSaida").value
    let horaRetorno = document.getElementById("horaRetorno").value
    let motivo = document.getElementById("motivo").value
    let localDestino = document.getElementById("localDestino").value
    let status = document.getElementById("status").value
    let nomeAluno = document.getElementById("nomeAluno").value
    let aluno_cod = Number(document.getElementById("aluno_id").value)
    let nomeProfessor = document.getElementById("nomeProfessor").value
    let professor_cod = Number(document.getElementById("professor_id").value)

    const valores = {
        dataSolicitacao: formatoData,
        horaSaida: horaSaida,
        horaRetorno: horaRetorno,
        motivo: motivo,
        localDestino: localDestino,
        status: status,
        nomeAluno: nomeAluno,
        nomeProfessor: nomeProfessor,
        aluno_cod: aluno_cod,
        professor_cod: professor_cod
    }

    res.innerHTML = ""

    fetch("http://localhost:8081/saida", {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.body)
        .then(() => {
            res.innerHTML = `<table border="1">
          <tr>
            <th>Data da Solicitação</th>
            <th>Hora de Saída</th>
            <th>Hora de Retorno</th>
            <th>Motivo</th>
            <th>Destino</th>
            <th>Status</th>
            <th>Aluno</th>
            <th>Código do Aluno</th>
            <th>Professor</th>
            <th>Código do Professor</th>
          </tr>
          <tr>
            <td>${formatoData}</td>
            <td>${horaSaida}</td>
            <td>${horaRetorno}</td>
            <td>${motivo}</td>
            <td>${localDestino}</td>
            <td>${status}</td>
            <td>${nomeAluno}</td>
            <td>${aluno_cod}</td>
            <td>${nomeProfessor}</td>
            <td>${professor_cod}</td>
          </tr>
        </table>`
        })
        .catch((err)=>{
          console.error("Erro: ", err)
      })
})