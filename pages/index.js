import { initElements, validationConfig } from "../scripts/constants.js";
import { checkValidityError, setButtonDisabled } from "../scripts/validate.js";
import { Card } from "../scripts/Card.js";

// Темплейт

const templateParent = document.querySelector('.elements__list'); 
const templateSelector = 'element';

// Кнопки открытия попапов

const popupProfileOpened = document.querySelector('.profile__edit');
const popupCardOpened = document.querySelector('.profile__add-element');

// Попапы

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

// Формы

const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupCardForm = popupCard.querySelector('.popup__form');

// Переменные профиля

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const popupProfileName = popupProfileForm.querySelector('.popup__input_profile_name');
const popupProfileCaption = popupProfileForm.querySelector('.popup__input_profile_caption');

// Переменные добавления карточек

const popupCardName = popupCardForm.querySelector('.popup__input_card_name');
const popupCardLink = popupCardForm.querySelector('.popup__input_card_link');

// Переменные окна просмотра

const showImage = popupImage.querySelector('.popup__image');
const showImageDescription = popupImage.querySelector('.popup__description');

function renderCards(card) { // Верстаем карточки
    templateParent.prepend(card);
}

function changeProfile(evt) { // Сохраняем изменения в профиле
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup(popupProfile);
}

function addNewCard(event) { // Добавляем новую карточку
    event.preventDefault();

    const card = {};
    card.title = popupCardName.value;
    card.link = popupCardLink.value;
    card.alt = `Изображение ${card.title}`;

    const newCard = new Card(card, templateSelector, showPopupImage);

    renderCards(newCard.createCard());
    closePopup(popupCard);

    popupCardForm.reset();
}

function openPopup(popup) { // Открываем попап
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(popup) { // Закрываем попап
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEsc);
}

function showPopupImage(item) { // Открываем окно просмотра
    openPopup(popupImage);

    showImage.src = item.src;
    showImage.alt = item.alt;
    showImageDescription.textContent = item.nextElementSibling.textContent;
}

function closePopupWithEsc(evt) { // Закрываем попап по нажатию на Esc
    if(evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

function closePopupWithOverlay(evt) { // Закрываем попап по клику на оверлэй
    if(evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

// Обрабатываем слушатели

popupProfileForm.addEventListener('submit', (evt) => changeProfile(evt));

popupCardForm.addEventListener('submit', (evt) => addNewCard(evt));

popupProfileOpened.addEventListener('click', () => {
    checkValidityError(popupProfileForm);
    setButtonDisabled(popupProfileForm.querySelector(validationConfig.submitButtonSelector));
    
    popupProfileName.value = profileName.textContent;
    popupProfileCaption.value = profileCaption.textContent;
    openPopup(popupProfile);
});

popupCardOpened.addEventListener('click', () => {
    checkValidityError(popupCardForm);
    setButtonDisabled(popupCardForm.querySelector(validationConfig.submitButtonSelector));
    
    popupCardForm.reset();
    openPopup(popupCard);
});

popups.forEach(item => {
    const popupButton = item.querySelector('.popup__close');
    popupButton.addEventListener('click', () => closePopup(item));
    item.addEventListener('click', closePopupWithOverlay);
});

// Перебираем входящий массив карточек

initElements.forEach(card => {
    const newCard = new Card(card, templateSelector, showPopupImage);
    renderCards(newCard.createCard());
});