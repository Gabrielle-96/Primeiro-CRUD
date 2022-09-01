document.addEventListener("DOMContentLoaded", function (e) {
    obterUsuario();
});

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

submit.addEventListener('click', function (e) {
    e.preventDefault();

    let formularioValido = validator.validate(form);

    if (formularioValido === false) {
        return;
    }

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const idUsuario = document.getElementById("id").value;

    fetch(`http://localhost:3000/usuario/${idUsuario}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    })
        .then(response => {
            if (response.status == 200) {
                alert("Usuário atualizado com sucesso!");
                window.location.href = `consultaUsuario.html`;
            } else {
                alert("Erro ao atualizar usuário");
            }
        }).catch(function (res) {
            alert("Erro ao atualizar usuário");
            console.log(res);
        });
});

function obterUsuario() {
    const idUsuario = obterIdUsuarioUrl();

    if (idUsuario > 0) {
        fetch(`http://localhost:3000/usuario/${idUsuario}`)
            .then(response => {
                return response.json();
            })
            .then(usuario => {
                carregarDadosUsuarioTela(usuario);
            })
            .catch(function (res) {
                alert("Erro ao obter usuário");
                console.log(res);
            });
    }
}

function obterIdUsuarioUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (!urlParams.has("id")) {
        alert("Usuário não identificado!");
        return 0;
    }

    return urlParams.get('id');
}

function carregarDadosUsuarioTela(usuario) {
    document.getElementById("id").value = usuario.id;
    document.getElementById("email").value = usuario.email;
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("sobrenome").value = usuario.sobrenome;
    document.getElementById("cep").value = usuario.cep;
    document.getElementById("endereco").value = usuario.endereco;
    document.getElementById("numero").value = usuario.numero;
    document.getElementById("bairro").value = usuario.bairro;
    document.getElementById("cidade").value = usuario.cidade;
    document.getElementById("estado").value = usuario.estado;
}