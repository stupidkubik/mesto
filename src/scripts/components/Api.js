export class Api {
    constructor( { baseUrl, headers } ) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
// Обновить ошибки
    async getId() {
        try {
            const idData = await fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: this._headers
            });
            return await idData.json();
        } catch(err) {
            console.log(err);
        }
    }

    async getCards() {
        try {
            const cardsData = await fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            });
            return await cardsData.json();
        } catch(err) {
            console.log(err);
        }
    }

    async postCard(cardData) {
        try {
            const newCardData = await fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardData.title,
                    link: cardData.link
                  })
            });
            return await newCardData.json();
        } catch(err) {
            console.log(err);
        }
    } 

    async updateProfile(inputValues) {
        try {
            const newProfileData = await fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: inputValues.title,
                    about: inputValues.caption
                  })
            });
            return await newProfileData.json();
        } catch(err) {
            console.log(err);
        }
    }

    async updateAvatar(inputValue) {
        try {
            const newAvatar = await fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: inputValue.avatar
                  })
            });
            return await newAvatar.json();
        } catch(err) {
            console.log(err);
        }
    }

    async putLike(cardId) {
        try {
            const countLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            });
            return await countLike.json();
        } catch(err) {
            console.log(err);
        } 
    }

    async deleteLike(cardId) {
        try {
            const countLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            });
            return await countLike.json();
        } catch(err) {
            console.log(err);
        } 
    }
    
    async deleteCard(cardId) {
        try {
            const cardDelete = await fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            });
            return await cardDelete.json();
        } catch(err) {
            console.log(err);
        } 
    }
}