export class Card {
    constructor(card, 
        templateSelector, 
        openDeletePopup, 
        myId, 
        handleCardClick, 
        handleLike) {
        this._card = card;
        this._templateSelector = templateSelector;
        this._openDeletePopup = openDeletePopup;
        this._myId = myId._id;
        this._handleCardClick = handleCardClick;
        this._handleLike = handleLike;
        this.notLiked = true;
    }

    _cloneTemplate() {
        return document
        .getElementById(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    _toggleLike = () => {
        if (this._like.classList.contains('element__like-icon_active')) {
            this._like.classList.remove('element__like-icon_active');
            this._removeLike();
        } else {
            this._like.classList.add('element__like-icon_active');
            this._addLike();
        }
    }

    async _addLike() {
        const newCard = await this._handleLike(true, this._card);
        this._likesCount.textContent = newCard.likes.length;
    }

    async _removeLike() {
        const newCard = await this._handleLike(false, this._card);
        this._likesCount.textContent = newCard.likes.length;
    }

    _checkLikeCount() {
        this._likes = this._card.likes;
        this._likes.forEach(likeOwner => {
            this._checkLikeStatus(likeOwner);
        }); 
        this._likesCount = this._clone.querySelector('.element__like-count');
        this._likesCount.textContent = this._likes.length;
    }

    _checkLikeStatus(likeOwner) {
        if(likeOwner._id === this._myId) {
            this._like.classList.add('element__like-icon_active');
        }
    }

    _checkCardOwnerId() {
        this._myId === this._card.owner._id
        ? this._trash.style = 'display: block' 
        : this._trash.style = 'display: none';
    }

    deleteCard() {
        this._clone.remove();
        this._clone = null;
    }

    _handleDeleteCard = () => {
        this._openDeletePopup.open(this, this._card);
    }

    _setEventListeners() {
        this._like = this._clone.querySelector('.element__like-icon');
        this._trash = this._clone.querySelector('.element__trash-icon');

        this._like.addEventListener('click', this._toggleLike);
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

        this._checkCardOwnerId();
        this._checkLikeCount();

        return this._clone;
    }
}