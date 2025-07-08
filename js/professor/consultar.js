let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
    e.preventDefault()

    let codProfessor = Number(document.getElementById("id").value)

    res.innerHTML = `<table>
    <tr>
      <th>Nome</th>
      <th>Sobrenome</th>
      <th>Matricula</th>
      <th>Telefone</th>
      <th>Email</th>
    </tr>`

    res.innerHTML = ""

    fetch(`http://localhost:8081/professor/${codProfessor}`, {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
        .then(resp => resp.json())
        .then(valores => {

            valores.forEach(val => {
                res.innerHTML += `  <tr>
    <td>${val.nome}</td>
    <td>${val.sobrenome}</td>
    <td>${val.matricula}</td>
    <td>${val.telefone}</td>
    <td>${val.email}</td>
  </tr></table>`
            });
        })
    .catch((err)=>{
        console.error("Erro: ", err)
    })
})