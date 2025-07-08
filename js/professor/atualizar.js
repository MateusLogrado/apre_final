let res = document.getElementById("res")
let button = document.getElementById("button")
let buscar = document.getElementById("buscar")

button.addEventListener("click", (e) => {
    e.preventDefault()


    let codProfessor = Number(document.getElementById("id").value)
    let nome = document.getElementById("nome").value
    let sobrenome = document.getElementById("sobrenome").value
    let matricula = Number(document.getElementById("matricula").value)
    let telefone = document.getElementById("telefone").value
    let email = document.getElementById("email").value

    const valores = {
        codProfessor: codProfessor,
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email
    }

    res.innerHTML = ""

    fetch(`http://localhost:8081/aluno/${codProfessor}`, {
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
})

buscar.addEventListener("click", (e)=>{
    e.preventDefault()

    let codAluno = Number(document.getElementById("id").value)

    let nome = document.getElementById("nome")
    let sobrenome = document.getElementById("sobrenome")
    let matricula = document.getElementById("matricula")
    let telefone = document.getElementById("telefone")
    let email = document.getElementById("email")

    res.innerHTML = ""

    fetch(`http://localhost:8081/aluno/${codAluno}`, {
        method: "GET",
        headers: {
            "Content-Type": "Application/JSON"
        }
    })
        .then(resp => resp.json())
        .then(val => {
            nome.value = val.nome
            sobrenome.value = val.sobrenome
            matricula.value = val.matricula
            telefone.value = val.telefone
            email.value = val.email
        })
    .catch((err)=>{
        console.error("Erro: ", err)
    })
})