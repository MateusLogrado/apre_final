let res = document.getElementById("res")
let button = document.getElementById("button")

button.addEventListener("click", (e) => {
e.preventDefault()

    let nome = document.getElementById("nome").value
    let sobrenome = document.getElementById("sobrenome").value
    let matricula = Number(document.getElementById("matricula").value)
    let telefone = document.getElementById("telefone").value
    let email = document.getElementById("email").value

    const valores = {
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    }

    res.innerHTML = ""

    fetch("http://localhost:8081/aluno", {
        method: "POST",
        headers: {
            "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.body)
        .then(() => {
            res.innerHTML = `<table>
  <tr>
    <th>Nome</th>
    <th>Sobrenome</th>
    <th>Matricula</th>
    <th>Telefone</th>
    <th>Email</th>
  </tr>
  <tr>
    <td>${nome}</td>
    <td>${sobrenome}</td>
    <td>${matricula}</td>
    <td>${telefone}</td>
    <td>${email}</td>
  </tr>
</table>`
        })
        .catch((err)=>{
          console.error("Erro: ", err)
      })
})