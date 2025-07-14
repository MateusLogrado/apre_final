document.addEventListener("click", function (e) {
    if (e.target.classList.contains("rejeitar")) {
        let id = Number(e.target.dataset.id)
        console.log("Aprovar ID:", id)

        fetch(`http://localhost:8081/saida/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(val => {
                console.log("Saída obtida:", val)
                fetch(`http://localhost:8081/aluno`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(resp => resp.json())
                    .then(alunos => {
                        const alunoExistente = alunos.find(alu =>
                            `${alu.nome} ${alu.sobrenome}`.trim().toLowerCase() === `${val.nomeAluno}`.trim().toLowerCase() ||
                            alu.nome.trim().toLowerCase() === val.nomeAluno.trim().toLowerCase()
                        )

                        fetch(`http://localhost:8081/professor`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(resp => resp.json())
                            .then(professor => {
                                const professorExistente = professor.find(prof =>
                                    `${prof.nome} ${prof.sobrenome}`.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase() ||
                                    prof.nome.trim().toLowerCase() === val.nomeProfessor.trim().toLowerCase()
                                )
                                console.log(professorExistente)

                                const dados = {
                                    dataSolicitacao: val.dataSolicitacao,
                                    horaSaida: val.horaSaida,
                                    horaRetorno: val.horaRetorno,
                                    motivo: val.motivo,
                                    localDestino: val.localDestino,
                                    status: "rejeitado",
                                    nomeAluno: val.nomeAluno,
                                    aluno_cod: alunoExistente.codAluno,
                                    nomeProfessor: val.nomeProfessor,
                                    professor_cod: professorExistente.codProfessor
                                }

                                fetch(`http://localhost:8081/saida/${id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "Application/JSON"
                                    },
                                    body: JSON.stringify(dados)
                                })
                                    .then(resp => resp.body)
                                    .then(() => {
                                        location.reload()
                                    })
                                    .catch(err => {
                                        console.error("Erro:", err)
                                    })
                            })
                    })
            })

    }
})