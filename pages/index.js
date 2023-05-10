import { initElements, validationConfig } from "../scripts/constants.js";
import { checkValidityError, setButtonDisabled } from "../scripts/validate.js";
import { Card } from "../scripts/Card.js";

// Переменные для добавления начальных карточек

const templateParent = document.querySelector('.elements__list'); 
const templateSelector = 'element';

// Кнопки для попапов

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

// Переменные для попапа с профилем

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const popupProfileName = popupProfileForm.querySelector('.popup__input_profile_name');
const popupProfileCaption = popupProfileForm.querySelector('.popup__input_profile_caption');

// Переменные для попапа с добавлением карточек

const popupCardName = popupCardForm.querySelector('.popup__input_card_name');
const popupCardLink = popupCardForm.querySelector('.popup__input_card_link');

// Переменные для попапа просмотра карточек

const showImage = popupImage.querySelector('.popup__image');
const showImageDescription = popupImage.querySelector('.popup__description');

function renderCards(card) { // Функция добавления карточки
    templateParent.prepend(card);
}

function changeProfile(evt) { // Сохраняем изменения в профиле
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup(popupProfile);
}

function addNewCard(event) { // Добавляем карточку
    event.preventDefault();

    const card = {};
    card.title = popupCardName.value;
    card.link = popupCardLink.value;
    card.alt = `Изображение ${card.title}`;

    const newCard = new Card(card, templateSelector, showPopupImage);

    renderCards(newCard.createCard()); // Генерируем новую карточку
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

function showPopupImage(item) { // Функция открытия попапа просмотра
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

popupProfileForm.addEventListener('submit', (evt) => changeProfile(evt)); // Сохраняем изменения

popupCardForm.addEventListener('submit', (evt) => addNewCard(evt)); // Сохраняем изменения

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

initElements.forEach(card => { // Перебор массива
    const newCard = new Card(card, templateSelector, showPopupImage);
    renderCards(newCard.createCard());
});