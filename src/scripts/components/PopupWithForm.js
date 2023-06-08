import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit, handleClose) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._handleClose = handleClose;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const inputValues = {}
        this._inputsList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
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
            this.close();
        });
    }
 
    close() {
        super.close();
        this._handleClose();
        this._form.reset();
    }
}