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

import { initElements, validationConfig } from "../scripts/utils/constants.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

// Ищем кнопки открытия попапов

const popupProfileOpened = document.querySelector('.profile__edit');
const popupCardOpened = document.querySelector('.profile__add-element');

// Запускаем валидацию

const popupProfileFormValidator = new FormValidator(validationConfig, '.popup__form_profile');
const popupCardFormValidator = new FormValidator(validationConfig, '.popup__form_card');

popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();

// Создаем экземпляры классов

const popupImage = new PopupWithImage('.popup_type_image');

const cardsList = new Section({
    items: initElements,
    renderer: (cardItem) => {
        const newCard = new Card(cardItem, 'element', (card) => {
            popupImage.openPopup(card);
        });
        return newCard.createCard(); 
    }}, '.elements__list' 
);

cardsList.renderItems(); // Рендерим изначальный массив карточек

const userInfo = new UserInfo({ "title": '.profile__name', "caption": '.profile__caption' })

const popupProfile = new PopupWithForm('.popup_type_profile', (element) => {
    userInfo.setUserInfo(element);
}, () => popupProfileFormValidator.checkValidityError());

const popupCard = new PopupWithForm('.popup_type_add', (element) => {
    cardsList.addItem(element);
}, () => popupCardFormValidator.checkValidityError());

// Добавил проверку валидации на закрытие попапа, чтобы убрать спан с ошибкой

userInfo.getUserInfo();
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();

function handlePopupProfile() { // Обрабатываем открытие попапа профиля
    popupProfileFormValidator.checkValidityError();
    popupProfileFormValidator.setButtonDisabled(); 
    popupProfile.setInputValues(userInfo.getUserInfo());
    popupProfile.openPopup();
}

function handlePopupCard() { // Обрабатываем открытие попапа карточки
    popupCardFormValidator.checkValidityError();
    popupCardFormValidator.setButtonDisabled();
    popupCard.openPopup();
}

// Добавляем обработчики открытия попапов

popupProfileOpened.addEventListener('click', handlePopupProfile);
popupCardOpened.addEventListener('click', handlePopupCard);