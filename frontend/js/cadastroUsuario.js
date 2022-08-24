class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate'
        ]
    }

    validate(form) {
        let formValid = true;

        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        let inputs = form.getElementsByTagName('input');

        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {

            for (let r = 0; this.validations.length > r; r++) {

                if (input.getAttribute(this.validations[r]) != null) {

                    let method = this.validations[r].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[r]);

                    if (this[method](input, value) == false) {
                        formValid = false;
                    }
                }
            }

        }, this);

        return formValid;
    }

    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um email válido (exemplo: email@email.com)`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    onlyletters(input) {

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo deve conter apenas letras (A-Z, a-z)`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo deve ser igual ao ${inputName}`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    passwordvalidate(input) {

        let arrayCaracter = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; arrayCaracter.length > i; i++) {
            if (arrayCaracter[i] === arrayCaracter[i].toUpperCase() && isNaN(parseInt(arrayCaracter[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(arrayCaracter[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa conter um número e um caracter maiúsculo`;

            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    required(input) {

        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);
            return false;
        }

        return true;
    }

    printMessage(input, msg) {

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());

    }
}

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

// inserindo o viaCEP

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
            //console.log(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }

}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);