class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            
        ]
    }

    validate(form) {

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        let inputs = form.getElementsByTagName('input');

        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {

            for (let r = 0; this.validations.length > r; r++) {

                if(input.getAttribute(this.validations[r]) != null) {

                    let method = this.validations[r].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[r]);

                    this[method](input, value);
                }
            }

        }, this);
    }

    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um email válido (exemplo: email@email.com)`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    onlyletters(input) {

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo deve conter apenas letras (A-Z, a-z)`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo deve ser igual ao ${inputName}`;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    passwordvalidate(input) {

        let arrayCaracter = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; arrayCaracter.length > i; i++) {
            if(arrayCaracter[i] === arrayCaracter[i].toUpperCase() && isNaN(parseInt(arrayCaracter[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(arrayCaracter[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa conter um número e um caracter maiúsculo`;

            this.printMessage(input, errorMessage);
        }
    }

    required(input) {

        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
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

    validator.validate(form);
});

