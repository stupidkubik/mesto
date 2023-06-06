export class Api {
    constructor( { myToken } ) {
        this._myToken = myToken;
        console.log(this._myToken);
    }

    static async getCards() {
        try {
            const cardsData = await fetch('https://mesto.nomoreparties.co/v1/cohort-68/cards', {
                method: 'GET',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63' // this._myToken
                }
            });
            return await cardsData.json();
        }
        catch(err) {
            console.error('Ошибка получения карточек: ', err);
        }
    }

    static async getId() {
        try {
            const idData = await fetch('https://mesto.nomoreparties.co/v1/cohort-68/users/me', {
                method: 'GET',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63'
                }
            });
            return await idData.json();
        }
        catch(err) {
            console.error('Ошибка запроса ID: ', err);
        }
    }

    static async postCard(cardData) {
        try {
            const newCardData = await fetch('https://mesto.nomoreparties.co/v1/cohort-68/cards', {
                method: 'POST',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63', // this._myToken
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: cardData,
                    link: cardData
                  })
            });
            return await newCardData.json();
        }
        catch(err) {
            console.error('Ошибка добавления карточки: ', err);
        }
    } 

    static async updateProfile(inputValue) {
        try {
            const newProfileData = await fetch('https://mesto.nomoreparties.co/v1/cohort-68/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: inputValue,
                    about: inputValue
                  })
            });
            return await newProfileData.json();

        }
        catch(err) {
            console.error(err);
        }
    }

    static async updateAvatar(inputValue) {
        try {
            const newAvatar = await fetch('https://mesto.nomoreparties.co/v1/cohort-68/users/me/avatar', {
                method: 'PATCH',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: inputValue 
                  })
            });
            return await newAvatar.json();

        }
        catch(err) {
            console.error(err);
        }
    }

    static async putLike(cardId) {
        try {
            const countLike = await fetch(`https://mesto.nomoreparties.co/v1/cohort-68/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63',
                }
            });
            return await countLike.json();

        }
        catch(err) {
            console.error(err);
        } 
    }

    static async deleteLike(cardId) {
        try {
            const countLike = await fetch(`https://mesto.nomoreparties.co/v1/cohort-68/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63',
                }
            });
            return await countLike.json();

        }
        catch(err) {
            console.error(err);
        } 
    } 
}