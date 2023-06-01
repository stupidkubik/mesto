import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._showImageDescription = this._popup.querySelector('.popup__description');
    }

    openPopup = (item) => {
        this._popupImage.src = item.src;
        this._popupImage.alt = item.title;
        this._showImageDescription.textContent = item.title;
        super.openPopup();
    }
}