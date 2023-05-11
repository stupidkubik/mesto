export class FormValidator {
    constructor(config, form) {
      this._form = form;
      this._config = config;
    }
  
    _enableButton() {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
    
    _disableButton() {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    }
  
    _checkButtonValidity() {
      this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  
      this._form.checkValidity() 
      ? this._enableButton() 
      : this._disableButton();
    }
  
    setFormValidity() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._checkButtonValidity();
      });
    }
  
    _setInputValid(input) {
      input.classList.remove(this._config.inputErrorClass);
      this._errorElement.classList.remove(this._config.errorClass);
      this._errorElement.textContent = '';
    }
  
    _setInputInvalid(input) {
      input.classList.add(this._config.inputErrorClass);
      this._errorElement.classList.add(this._config.errorClass);
      this._errorElement.textContent = input.validationMessage;
    }
  
    _checkInputValidity(input) {
      this._errorElement = document.querySelector(`#error-${input.id}`);
    
      input.checkValidity() 
      ? this._setInputValid(input) 
      : this._setInputInvalid(input);
    }
  
    setInputValidity() {
      const inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  
      inputsList.forEach(input => {
        this._checkButtonValidity(input);
    
        input.addEventListener('input', () => {
          this._checkButtonValidity(input);
          this._checkInputValidity(input);
        });
      });
    }
}