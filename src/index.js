// Импорт изображений

import profileAvatarImage from './images/profile__avatar.jpg';
import iconAddLogo from './images/logo/icon__add-element.svg';
import iconCloseLogo from './images/logo/icon-close.svg';
import iconLikeActiveLogo from './images/logo/icon-like_active.svg';
import iconLikeDisabledLogo from './images/logo/icon-like_disabled.svg';
import iconPenLogo from './images/logo/icon-pen.svg';
import iconTrashLogo from './images/logo/icon-trash.svg';
import blackLogo from './images/logo/logo-black.svg';
import whiteLogo from './images/logo/logo-white.svg';

// Подключение файлов стилей и скриптов

import './index.css';

import { initElements, validationConfig } from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from './scripts/utils/Section.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { UserInfo } from './scripts/components/UserInfo.js';

// Кнопки открытия попапов

const popupProfileOpened = document.querySelector('.profile__edit');
const popupCardOpened = document.querySelector('.profile__add-element');


// Запускаем валидацию

// const popupProfileFormValidator = new FormValidator(validationConfig, '.popup__form_profile');
// const popupCardFormValidator = new FormValidator(validationConfig, '.popup__form_card');

// popupProfileFormValidator.enableValidation();
// popupCardFormValidator.enableValidation();

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

cardsList.renderItems();

const userInfo = new UserInfo({ "title": '.profile__name', "caption": '.profile__caption' })

const popupProfile = new PopupWithForm('.popup_type_profile', (element) => {
    userInfo.setUserInfo(element);
});

const popupCard = new PopupWithForm('.popup_type_add', (element) => {
    cardsList.addItem(element);
});

userInfo.getUserInfo();
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();

function handlePopupProfile() { // Обрабатываем открытие попапа
    // popupProfileFormValidator.checkValidityError();
    // popupProfileFormValidator.setButtonDisabled(); 
    popupProfile.setInputValues(userInfo.getUserInfo());
    popupProfile.openPopup();
}

function handlePopupCard() { // Обрабатываем открытие другого попапа
    // popupCardFormValidator.checkValidityError();
    // popupCardFormValidator.setButtonDisabled();
    popupCard.openPopup();
}

popupProfileOpened.addEventListener('click', handlePopupProfile);
popupCardOpened.addEventListener('click', handlePopupCard);





// function addNewCard(event) { // Добавляем новую карточку
//     event.preventDefault();

//     const newCard = new Section({
//         items: {
//             name: popupCardName.value,
//             link: popupCardLink.value
//         },
//         renderer: (cardItem) => {
//             const newCard = new Card(cardItem, templateSelector, () => {});
//             templateParent.prepend(newCard.createCard());
//         }}, templateParent
//     );
    
//     cardsList.renderItems(); 

//     // const card = {};
//     // card.name = popupCardName.value;
//     // card.link = popupCardLink.value;

//     // const newCard = new Card(card, templateSelector, showPopupImage);

//     // renderCards(newCard.createCard());
//     closePopup(popupCard);

//     popupCardForm.reset();
// }





// const profileName = document.querySelector('.profile__name');
// const profileCaption = document.querySelector('.profile__caption');
// const popupProfileName = popupProfileForm.querySelector('.popup__input_profile_name');
// const popupProfileCaption = popupProfileForm.querySelector('.popup__input_profile_caption');

// initElements.forEach(card => {
//     const newCard = new Card(card, templateSelector, showPopupImage);
//     const newSection = new Section({ newCard, }, templateParent);
//     renderCards(newCard.createCard());
// });

// function renderCards(card) { // Верстаем карточки
//     templateParent.prepend(card);
// }

// function changeProfile(evt) { // Сохраняем изменения в профиле
//     evt.preventDefault();
//     profileName.textContent = popupProfileName.value;
//     profileCaption.textContent = popupProfileCaption.value;
//     closePopup(popupProfile);
// }


// function openPopup(popup) { // Открываем попап
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupWithEsc);
// }

// function closePopup(popup) { // Закрываем попап
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupWithEsc);
// }

// function showPopupImage(item) { // Открываем окно просмотра
//     openPopup(popupImage);

//     showImage.src = item.src;
//     showImage.alt = item.name;
//     showImageDescription.textContent = item.nextElementSibling.textContent;
// }

// function closePopupWithEsc(evt) { // Закрываем попап по нажатию на Esc
//     if(evt.key === 'Escape') {
//         closePopup(document.querySelector('.popup_opened'));
//     }
// }

// function closePopupWithOverlay(evt) { // Закрываем попап по клику на оверлэй
//     if(evt.target === evt.currentTarget) {
//         closePopup(evt.currentTarget);
//     }
// }

// Обрабатываем слушатели

// popupProfileForm.addEventListener('submit', (evt) => changeProfile(evt));

// popupCardForm.addEventListener('submit', (evt) => addNewCard(evt));



// popups.forEach(item => {
//     const popupButton = item.querySelector('.popup__close');
//     popupButton.addEventListener('click', () => closePopup(item));
//     item.addEventListener('mousedown', closePopupWithOverlay);
// });