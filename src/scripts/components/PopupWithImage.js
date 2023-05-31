import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._showImageDescription = this._popupImage.querySelector('.popup__description');
    }

    openPopup = (item) => {
        super.openPopup();
        
        this._popupImage.src = item.src;
        this._showImageDescription.alt = item.name;
        this._showImageDescription.textContent = item.nextElementSibling.textContent;
    }
}