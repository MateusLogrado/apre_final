document.addEventListener("click", function(e){
    if(e.target.classList.contains("aprovar")){
        let id = e.target.dataset.id
        console.log("Aprovar ID:", id)
    }

    const valor = {
        status: "aprovado"
    }

    fetch(`http://localhost:8081/${id}`,{
        method: "PUT",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify.body(valor)
    })
    .then(resp => resp.body)
    .then(()=>{
        
    })
    .catch((err)=>{
        console.error("Erro: ", err)
    })
})