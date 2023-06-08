import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, handleFormSubmit, handleClose) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._handleClose = handleClose;
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._card); // ??
            this.close();
        });
    } 

    open(card) {
        super.open();
        this._card = card;
    }
}