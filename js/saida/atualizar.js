let res = document.getElementById("res")
let button = document.getElementById("button")
let buscar = document.getElementById("buscar")

button.addEventListener("click", (e) => {
    e.preventDefault()

    let codSaida = Number(document.getElementById("codSaida").value)


    let dataSolicitacao = document.getElementById("dataSolicitacao").value
    console.log(dataSolicitacao)

    let horaSaida = document.getElementById("horaSaida").value
    let horaRetorno = document.getElementById("horaRetorno").value
    let motivo = document.getElementById("motivo").value
    let localDestino = document.getElementById("localDestino").value
    let status = document.getElementById("status").value
    let nomeAluno = document.getElementById("nomeAluno").value
    let aluno_cod = document.getElementById("aluno_id").value
    let nomeProfessor = document.getElementById("nomeProfessor").value
    let professor_cod = document.getElementById("professor_id").value

    const valores = {
        dataSolicitacao: dataSolicitacao,
        horaSaida: horaSaida,
        horaRetorno: horaRetorno,
        motivo: motivo,
        localDestino: localDestino,
        status: status,
        nomeAluno: nomeAluno,
        aluno_cod: aluno_cod,
        nomeProfessor: nomeProfessor,
        professor_cod: professor_cod
    }

    res.innerHTML = ""

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.body)
        .then(() => {
            res.innerHTML = `<table>
  <tr>
            <th>Codigo</th>
            <th>Data da Solicitação</th>
            <th>Hora de Saída</th>
            <th>Hora de Retorno</th>
            <th>Motivo</th>
            <th>Destino</th>
            <th>Status</th>
            <th>Aluno</th>
            <th>codigo do Aluno</th>
            <th>Professor</th>
            <th>Codigo do Professor</th>
  </tr>
  <tr>
            <td>${codSaida}</td>
            <td>${dataSolicitacao}</td>
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
})

buscar.addEventListener("click", (e) => {
    e.preventDefault()

    let codSaida = Number(document.getElementById("codSaida").value)

    let dataSolicitacao = document.getElementById("dataSolicitacao")
    let horaSaida = document.getElementById("horaSaida")
    let horaRetorno = document.getElementById("horaRetorno")
    let motivo = document.getElementById("motivo")
    let localDestino = document.getElementById("localDestino")
    let status = document.getElementById("status")
    let nomeAluno = document.getElementById("nomeAluno")
    let nomeProfessor = document.getElementById("nomeProfessor")

    res.innerHTML = ""

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
        .then(resp => resp.json())
        .then(val => {
            fetch("http://localhost:8081/aluno", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => resp.json())
                .then(alunos => {
                    const alunoExistente = alunos.find(alu =>
                        alu.nome.trim().toLowerCase() === `${val.nomeAluno} ${val.sobrenomeAluno}`.trim().toLowerCase() ||
                        alu.nome.trim().toLowerCase() === val.nomeAluno.trim().toLowerCase()
                    )
                    console.log(alunoExistente)
                    fetch("http://localhost:8081/professor", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }})
                        .then(resp => resp.json())
                        .then(professores => {
                            const professorExistente = professores.find(prof =>
                                prof.nome.trim().toLowerCase() === `${val.nomeProfessor} ${val.sobrenomeProfessor}`.trim().toLowerCase() ||
                                prof.nome.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase()
                            )
                            dataSolicitacao.value = val.dataSolicitacao
                            horaRetorno.value = val.horaRetorno
                            horaSaida.value = val.horaSaida
                            motivo.value = val.motivo
                            localDestino.value = val.localDestino
                            status.value = val.status
                            nomeAluno.value = val.nomeAluno
                            aluno_id.value = alunoExistente.codAluno
                            nomeProfessor.value = val.nomeProfessor
                            professor_id.value = professorExistente.codProfessor

                            console.log(professorExistente)
                            console.log(alunoExistente)
                        })
                })
                .catch((err) => {
                    console.error("Erro: ", err)
                })
        }

        )
        .catch((err) => {
            console.error("Erro: ", err)
        })
})