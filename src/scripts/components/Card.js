export class Card {
    constructor(card, templateSelector, openDeletePopup, handleCardClick) {
        this._card = card;
        this._templateSelector = templateSelector;
        this._openDeletePopup = openDeletePopup.open;
        this._handleCardClick = handleCardClick;
        console.log(this._openDeletePopup);
    }

    _cloneTemplate() {
        return document
        .getElementById(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    _addLike = () => {
        this._like.classList.toggle('element__like-icon_active');
    }

    _handleDeleteCard() {
        console.log(this._openDeletePopup);
        this._openDeletePopup(this.deleteCard); 
    }

    _setEventListeners() {
        this._like = this._clone.querySelector('.element__like-icon');
        this._trash = this._clone.querySelector('.element__trash-icon');

        this._like.addEventListener('click', this._addLike);
        this._trash.addEventListener('click', this._handleDeleteCard);
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardImage));
    }

    createCard() {
        this._clone = this._cloneTemplate();

        this._cardImage = this._clone.querySelector('.element__image');
        this._cardTitle = this._clone.querySelector('.element__title');

        this._cardImage.src = this._card.link;
        this._cardImage.alt = this._card.name;
        this._cardTitle.textContent = this._card.name;

        this._setEventListeners();
        
        return this._clone;
    }

    deleteCard = () => {
        this._clone.remove();
        this._clone = null;
    }
}