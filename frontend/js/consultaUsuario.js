document.addEventListener("DOMContentLoaded", function (e) {
    obterUsuarios();
});

function obterUsuarios() {
    fetch('http://localhost:3000/usuario')
    .then(response => {
console.log(response);alert("aqui");
        if (response.status == 200) {
            console.log(response);
            montarTabelaUsuarios(response);
        } else {
            alert("Ocorreu um problema ao obter usuários");
        }
    }).catch(function (res) {
        alert("Erro ao obter usuários");
        console.log(res);
    });
}

function montarTabelaUsuarios(usuarios) {
    let tabela = document.getElementById("usuarios");
    usuarios.forEach(usuario => {
        let linha = criarLinhaUsuario(usuario);
        tabela.appendChild(linha);
    });
}

function criarLinhaUsuario(usuario) {
    console.log(usuario);

    linha = document.createElement("tr");
    tdId = document.createElement("td");
    tdNome = document.createElement("td");
    tdId.innerHTML = usuario.id;
    tdNome.innerHTML = usuario.nome;

    linha.appendChild(tdId);
    linha.appendChild(tdNome);

    return linha;
}
