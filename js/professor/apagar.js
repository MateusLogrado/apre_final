let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    let codProfessor = Number(document.getElementById("id").value)

    const valores = {
        codProfessor: codProfessor,
    }

    fetch(`http://localhost:8081/professor/${codProfessor}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"Application/JSON"
        },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if(resp.status === 201){
            res.innerHTML = "Dados excluidos com sucesso"
        }
    })
    .then()
    .catch((err)=>{
        console.error("Erro:", err)
    })
})