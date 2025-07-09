let button = document.getElementById("button")
let res = document.getElementById("res")

button.addEventListener("click", (e)=>{
    e.preventDefault()

    let codSaida = Number(document.getElementById("id").value)

    fetch(`http://localhost:8081/saida/${codSaida}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"Application/JSON"
        }
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