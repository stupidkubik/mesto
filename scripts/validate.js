import { validationConfig } from "./constants.js"
import { FormValidator } from "../scripts/FormValidator.js"

export function checkValidityError(form) { // Сбрасываем форму при закрытии попапа
  form.querySelectorAll(validationConfig.inputSelector).forEach(input => {
    const errorElement = document.querySelector(`#error-${input.id}`);

    if(!input.checkValidity()) {
      input.classList.remove(validationConfig.inputErrorClass);
      errorElement.classList.remove(validationConfig.errorClass);
      errorElement.textContent = ''; 
    }
  });
}

export function setButtonDisabled(submitButton) {
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.setAttribute('disabled', ''); 
}

function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  
  formsList.forEach(formElement => {
    const formValidation = new FormValidator(config, formElement);

    formValidation.setInputValidity();
    formValidation.setFormValidity();
  });
}

enableValidation(validationConfig);