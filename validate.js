import { validationConfig } from "./constants.js"

export function checkValidityError(form) { // Сбрасываем форму при закрытии попапа
  form.querySelectorAll(validationConfig.inputSelector).forEach(input => {
    const errorElement = document.querySelector(`#error-${input.id}`);

    if(!input.checkValidity()) {
      setInputValid(validationConfig, input, errorElement);
    }
  });
}

export function setButtonDisabled(submitButton) {
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.setAttribute('disabled', ''); 
}

function setInputValid(config, input, errorElement) { // Меняем инпут на валидный
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function setInputInvalid(config, input, errorElement) { // Меняем инпут на инвалидный
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validationMessage;
};

function checkInputValidity(config, input) { // Проверяем валидность инпута
  const errorElement = document.querySelector(`#error-${input.id}`);

  if(input.checkValidity()) {
    setInputValid(config, input, errorElement);
  } else {
    setInputInvalid(config, input, errorElement);
  }
};

function enableButton(config, submitButton) { // Включаем кнопку в форме
  submitButton.classList.remove(config.inactiveButtonClass);
  submitButton.removeAttribute('disabled');
};

function disableButton(config, submitButton) { // Выключаем кнопку в форме
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.setAttribute('disabled', '');
};

function checkButtonValidity(config, form) { // Проверяем валидность формы и меняем статус кнопки
  const submitButton = form.querySelector(config.submitButtonSelector);

  if(form.checkValidity()) {
    enableButton(config, submitButton);
  }  else {
    disableButton(config, submitButton);
  }
};

function setFormValidity(config, formElement) { // Устанавливаем начальный статус формы
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
    checkButtonValidity(config, formElement);
  });
}

function setInputValidity(config, form) { // Запускаем проверку инпутов при вводе данных
  const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
  
  inputsList.forEach(input => {
    checkButtonValidity(config, form);

    input.addEventListener('input', () => {
      checkButtonValidity(config, form);
      checkInputValidity(config, input);
    });
  });
}

function enableValidation(config) { // Запускаем валидацию в формах
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(formElement => {
    setInputValidity(config, formElement);
    setFormValidity(config, formElement);
  });
};

enableValidation(validationConfig);