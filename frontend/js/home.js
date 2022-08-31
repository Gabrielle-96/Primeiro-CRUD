document.addEventListener("DOMContentLoaded", function (e) {
    obterUsuarioLogado();
});

function obterUsuarioLogado() {
    fetch('http://localhost:3000/usuario-logado',{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
    })
    .then(response => {
        return response.json();
    })
    .then(usuario => {
        console.log(usuario);
    })
    .catch(function (res) {
        alert("Erro ao obter dados do usuário logado");
        console.log(res);
    });
}