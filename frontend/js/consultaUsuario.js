document.addEventListener("DOMContentLoaded", function (e) {
    obterUsuarios();
});

function obterUsuarios() {
    fetch('http://localhost:3000/usuario')
    .then(response => {
        console.log(response,"aqui");
        return response.json();
    })
    .then(usuarios => {
          montarTabelaUsuarios(usuarios);
    })
    .catch(function (res) {
        alert("Erro ao obter usuários");
        console.log(res);
    });
}

function montarTabelaUsuarios(usuarios) {
    let conteudoTabela = document.getElementById("usuariosBody");
    usuarios.forEach(usuario => {
        let linha = criarLinhaUsuario(usuario);
        conteudoTabela.appendChild(linha);
    });
}

function criarLinhaUsuario(usuario) {
    console.log(usuario);

    linha = document.createElement("tr");
    
    tdNome = document.createElement("td");
    tdNome.innerHTML = usuario.nome;
    
    tdEmail = document.createElement("td");      
    tdEmail.innerHTML = usuario.email;
    
    tdBtnExcluir = document.createElement("td"); 
    tdBtnExcluir.innerHTML = `<button type='button' onclick="excluirUsuario('${usuario.id}')" >Excluir</button>`;
    
    tdBtnEditar = document.createElement("td"); 
    tdBtnEditar.innerHTML = `<button type='button' onclick="editarUsuario('${usuario.id}')" >Editar</button>`;

    linha.appendChild(tdNome);
    linha.appendChild(tdEmail);
    linha.appendChild(tdBtnExcluir);
    linha.appendChild(tdBtnEditar);

    return linha;
}

function excluirUsuario(id) {
    fetch(`http://localhost:3000/usuario/${id}`, { method: 'DELETE' })
    .then(response => {
        alert("Usuário excluído com sucesso!");
    }).catch(function (res) {
        alert("Erro ao excluir usuários");
        console.log(res);
    });
}

function editarUsuario(id) {
    console.log(id);
    window.location.href = `cadastroUsuario.html/?id=${id}`;
}
