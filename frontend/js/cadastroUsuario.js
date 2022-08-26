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

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    })
        .then(response => {
            if (response.status == 200) {
                alert("Usuário registrado com sucesso!");
                form.reset();
            } else {
                alert("Erro ao registrar usuário");
            }
        }).catch(function (res) {
            alert("Erro ao registrar usuário");
            console.log(res);
        });
});