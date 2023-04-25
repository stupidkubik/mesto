// import { validationConfig } from "./constants.js"

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; // { 1, 2, ...restObj }




function setInputValid(config, input, errorElement) {
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function setInputInvalid(config, input, errorElement) {
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validationMessage;
};

function checkInputValidity(config, input) {
  const errorElement = document.querySelector(`#error-${input.id}`);

  if(input.checkValidity()) {
    setInputValid(config, input, errorElement);
  } else {
    setInputInvalid(config, input, errorElement);
  }
};

function enableButton(config, submitButton) {
  submitButton.classList.remove(config.inactiveButtonClass);
  submitButton.removeAttribute('disabled');
};

function disableButton(config, submitButton) {
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.setAttribute('disabled', '');
};

function checkButtonValidity(config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);

  if(form.checkValidity()) {
    enableButton(config, submitButton);
  }  else {
    disableButton(config, submitButton);
  }
};

function setFormValidity(config, formElement) {
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    checkButtonValidity(config, formElement);
  });
}

function setInputValidity(config, form) {
  const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
  
  inputsList.forEach(input => {
    checkButtonValidity(config, form);// хз, что делать или начальный

    input.addEventListener('input', () => {
      checkButtonValidity(config, form);
      checkInputValidity(config, input);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    setInputValidity(config, formElement);
    setFormValidity(config, formElement);
  });
};

enableValidation(validationConfig);

function checkValidityError(form) {
  form.querySelectorAll(validationConfig.inputSelector).forEach(input => {
    const errorElement = document.querySelector(`#error-${input.id}`);

    if(!input.checkValidity()) {
      setInputValid(validationConfig, input, errorElement);
    }
  });
}