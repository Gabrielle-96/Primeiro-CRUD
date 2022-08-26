document.addEventListener("DOMContentLoaded", function (e) {
    obterUsuarios();
});

function obterUsuarios() {
    fetch('http://localhost:3000/usuario')
    .then(response => {
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
        let trUsuario = criarLinhaUsuario(usuario);
        conteudoTabela.appendChild(trUsuario);
    });
}

function criarLinhaUsuario(usuario) {

    let trUsuario = document.createElement("tr");
    trUsuario.id = `tr_${usuario.id}`;
    
    let tdNome = document.createElement("td");
    tdNome.innerHTML = `${usuario.nome} ${usuario.sobrenome}`;
    
    let tdEmail = document.createElement("td");      
    tdEmail.innerHTML = usuario.email;
    
    let tdEndereco = document.createElement("td");
    tdEndereco.innerHTML = usuario.endereco;

    let tdBtnExcluir = document.createElement("td"); 
    tdBtnExcluir.innerHTML = `<button type='button' class='btn-delete' onclick="excluirUsuario('${usuario.id}')" >Excluir</button>`;
    
    let tdBtnEditar = document.createElement("td"); 
    tdBtnEditar.innerHTML = `<button type='button' class='btn-edit' onclick="editarUsuario('${usuario.id}')" >Editar</button>`;

    trUsuario.appendChild(tdNome);
    trUsuario.appendChild(tdEmail);
    trUsuario.appendChild(tdEndereco);
    trUsuario.appendChild(tdBtnExcluir);
    trUsuario.appendChild(tdBtnEditar);

    return trUsuario;
}

function excluirUsuario(id) {
    fetch(`http://localhost:3000/usuario/${id}`, { method: 'DELETE' })
    .then(response => {
        alert("Usuário excluído com sucesso!");
        document.getElementById(`tr_${id}`).remove();
    }).catch(function (res) {
        alert("Erro ao excluir usuários");
        console.log(res);
    });
}

function editarUsuario(id) {
    window.location.href = `edicaoUsuario.html?id=${id}`;
}
