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
    .then(response => {
        if (response.status==200) {
            alert("Usuário autenticado com sucesso!");
        } else {
            alert("Usuário não encontrado");
        }
        form.reset();
    }).catch(function (res) {
        alert("Erro ao autenticar usuário");
        console.log(res);
    });
});
