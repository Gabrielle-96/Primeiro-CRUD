let submit = document.getElementById("login-btn");

submit.addEventListener('click', function (e) {
    e.preventDefault();

    let form = document.getElementById("login-form");

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    })
        .then(async(response) => {
            if (response.status == 200) {
                //Grava no localStorage do navegador o token de acesso
                let dadosResposta = await response.json();
                localStorage.setItem("token", dadosResposta.token);

                alert("Usuário autenticado com sucesso!");
                window.location.href = `home.html`;
            } else {
                alert("Usuário não encontrado");
            }
            form.reset();
        }).catch(function (res) {
            alert("Erro ao autenticar usuário");
            console.log(res);
        });
});
