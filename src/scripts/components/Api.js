export class Api {
    constructor( { baseUrl, headers } ) {
        this._baseUrl = baseUrl;
        this._headers = headers;      
    }

    async getCards() {
        try {
            const cardsData = await fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            });
            return await cardsData.json();
        }
        catch(err) {
            console.error(err);
        }
    }

    async getId() {
        try {
            const idData = await fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: this._headers
            });
            return await idData.json();
        }
        catch(err) {
            console.error(err);
        }
    }

    static async postCard(cardData) {
        try {
            const newCardData = await fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardData,
                    link: cardData
                  })
            });
            return await newCardData.json();
        }
        catch(err) {
            console.log(err);
        }
    } 

    static async updateProfile(inputValue) {
        try {
            const newProfileData = await fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: inputValue,
                    about: inputValue
                  })
            });
            return await newProfileData.json();

        }
        catch(err) {
            console.log(err);
        }
    }

    static async updateAvatar(inputValue) {
        try {
            const newAvatar = await fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: inputValue 
                  })
            });
            return await newAvatar.json();

        }
        catch(err) {
            console.log(err);
        }
    }

    static async putLike(cardId) {
        try {
            const countLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            });
            return await countLike.json();

        }
        catch(err) {
            console.log(err);
        } 
    }

    static async deleteLike(cardId) {
        try {
            const countLike = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            });
            return await countLike.json();

        }
        catch(err) {
            console.log(err);
        } 
    } 
}