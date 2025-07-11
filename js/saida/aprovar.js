document.addEventListener("click", function (e) {
    if (e.target.classList.contains("aprovar")) {
        let id = Number(e.target.dataset.id)
        console.log("Aprovar ID:", id)

        // Buscar os dados do registro clicado (opcional, se necessário)
        fetch(`http://localhost:8081/saida/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(val => {
            const body = {
                dataSolicitacao: val.dataSolicitacao,
                horaSaida: val.horaSaida,
                horaRetorno: val.horaRetorno,
                motivo: val.motivo,
                localDestino: val.localDestino,
                status: "aprovado", // Atualiza status aqui
                nomeAluno: val.nomeAluno,
                aluno_cod: val.aluno_cod,
                nomeProfessor: val.nomeProfessor,
                professor_cod: val.professor_cod
            };

            return fetch(`http://localhost:8081/saida/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
        })
        .then(resp => {
            if (!resp.ok) {
                return resp.text().then(texto => {
                    throw new Error("Erro do servidor: " + texto);
                });
            }
            return resp.json();
        })
        .then(data => {
            console.log("Atualizado com sucesso:", data);
        })
        .catch(err => {
            console.error("Erro ao atualizar:", err);
        });
    }
});
