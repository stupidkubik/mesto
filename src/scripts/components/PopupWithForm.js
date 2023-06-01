import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit, handleError) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._handleError = handleError;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputsList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setInputValues(info) {
        this._inputsList.forEach((input) => {
            input.value = info[input.name];
        }); 
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }
 
    closePopup() {
        super.closePopup();
        this._handleError();
        this._form.reset();
    }
}