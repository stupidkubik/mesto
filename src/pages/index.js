// Импорт изображений

import profileAvatarImage from '../images/profile__avatar.jpg';
import iconAddLogo from '../images/logo/icon__add-element.svg';
import iconCloseLogo from '../images/logo/icon-close.svg';
import iconLikeActiveLogo from '../images/logo/icon-like_active.svg';
import iconLikeDisabledLogo from '../images/logo/icon-like_disabled.svg';
import iconPenLogo from '../images/logo/icon-pen.svg';
import iconTrashLogo from '../images/logo/icon-trash.svg';
import blackLogo from '../images/logo/logo-black.svg';
import whiteLogo from '../images/logo/logo-white.svg';

// Подключение файлов стилей и скриптов

import './index.css';

import { validationConfig } from "../scripts/utils/constants.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { Api } from '../scripts/components/Api.js';

// Ищем кнопки открытия попапов

const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupCardOpenButton = document.querySelector('.profile__add-element');
const popupAvatarOpenButton = document.querySelector('.profile__avatar-edit');

// Запускаем валидацию

const popupProfileFormValidator = new FormValidator(validationConfig, '.popup__form_profile');
const popupCardFormValidator = new FormValidator(validationConfig, '.popup__form_card');
const popupAvatarFormValidator = new FormValidator(validationConfig, '.popup__form_avatar');

popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();

// Загружаем начальные данные с API

const api = new Api( {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
        authorization: 'cad6e116-edab-4c4b-8149-8b724d78ff63',
        'Content-Type': 'application/json' 
    }
});

api.getCards() // Запрашиваем массив карточек с сервера
.then((cards) => {
    cards.reverse().forEach((card) => cardsList.renderCard(card));
});

let myId = {}; // Создаем объект данных профиля и наполняем его

api.getId()
.then((user) => {
    userInfo.setUserInfo(user);
    myId = user;
})

// Создаем экземпляры классов

const popupDelete = new PopupWithConfirmation('.popup_type_delete', async (cardElement, card) => {
    await api.deleteCard(card._id);
    cardElement.deleteCard();
    popupDelete.close();
});

const popupImage = new PopupWithImage('.popup_type_image');

const cardsList = new Section('.elements__list', (cardItem) => {
        const newCard = new Card(
            cardItem, // Элемент карточки 
            'element', // Селектор контейнера
            popupDelete, // Попап подтверждения удаления
            myId, // Объект с моим ID
            (card) => { // Функция открытия фото в попапе
            popupImage.open(card);
            }, 
            async (boolean, card) => { // Функция клика по лайкам
                try {
                    if(boolean) {
                        return await api.putLike(card._id);
                    } else {
                        return await api.deleteLike(card._id);
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        );
        return newCard.createCard();
    });

const userInfo = new UserInfo( { 
    titleSelector: '.profile__name', 
    captionSelector: '.profile__caption', 
    avatarSelector: '.profile__avatar' 
} )

const popupProfile = new PopupWithForm('.popup_type_profile', async (inputValues) => {
    const info = await api.updateProfile(inputValues);
    userInfo.setUserInfo(info);
}, () => popupProfileFormValidator.checkValidityError());

const popupCard = new PopupWithForm('.popup_type_add', async (inputValues) => {
    const card = await api.postCard(inputValues);
    cardsList.renderCard(card);
}, () => popupCardFormValidator.checkValidityError());

const popupAvatar = new PopupWithForm('.popup_type_avatar', async (inputValue) => {
    const info = await api.updateAvatar(inputValue);
    document.querySelector('.profile__avatar').src = info.avatar;
}, () => popupAvatarFormValidator.checkValidityError());

// Добавляем слушатели

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();

function handlePopupProfile() { // Обрабатываем открытие попапа профиля
    popupProfileFormValidator.setButtonDisabled(); 
    popupProfile.setInputValues(userInfo.getUserInfo());
    popupProfile.open();
}

function handlePopupCard() { // Обрабатываем открытие попапа карточки
    popupCardFormValidator.setButtonDisabled();
    popupCard.open();
}

function handlePopupAvatar() { // Обрабатываем открытие попапа с аватаром
    popupAvatarFormValidator.setButtonDisabled();
    popupAvatar.open()
}
// Добавляем обработчики открытия попапов

popupProfileOpenButton.addEventListener('click', handlePopupProfile);
popupCardOpenButton.addEventListener('click', handlePopupCard);
popupAvatarOpenButton.addEventListener('click', handlePopupAvatar);

// for(let i = 0; i < 30; i++) {
//     api.postCard({ title: `Фото №${i}`, link: 'https://picsum.photos/800/800' })
//     .then((card) => {
//         cardsList.renderCard(card);
//     }) 
// } 