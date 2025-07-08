let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
    e.preventDefault()



    fetch("http://localhost:8081/professor", {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
        .then(resp => resp.json())
        .then(valores => {
            let html = `<table>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Matricula</th>
                    <th>Telefone</th>
                    <th>Email</th>
                </tr>`
        
            valores.forEach(val => {
                html += `<tr>
                    <td>${val.nome}</td>
                    <td>${val.sobrenome}</td>
                    <td>${val.matricula}</td>
                    <td>${val.telefone}</td>
                    <td>${val.email}</td>
                </tr>`
            });
        
            html += `</table>`
            res.innerHTML = html
        })
    .catch((err)=>{
        console.error("Erro: ", err)
    })
})