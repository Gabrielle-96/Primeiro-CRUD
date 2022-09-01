document.addEventListener("DOMContentLoaded", function (e) {
    obterUsuarioLogado();
});

function obterUsuarioLogado() {
    fetch('http://localhost:3000/usuario-logado', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
    })
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                alert("Erro ao obter dados do usuário logado");
                window.location.href = `login.html`;
                return;
            }
        })
        .then(dados => {
            alert(`Bem vindo(a) ${dados.usuario.nome} !`);
        })
        .catch(function (res) {
            alert("Erro ao obter dados do usuário logado");
            console.log(res);
            window.location.href = `login.html`;
        });
}
