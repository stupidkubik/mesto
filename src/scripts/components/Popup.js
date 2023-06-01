export class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeButton = this._popup.querySelector('.popup__close');
    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _closePopupWithOverlay = (evt) => {
        if(evt.target === evt.currentTarget) {
            this.closePopup();
        }
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.closePopup());
        this._popup.addEventListener('mousedown', this._closePopupWithOverlay);
    }
}
