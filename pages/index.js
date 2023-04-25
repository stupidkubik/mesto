import { initElements } from "../constants.js";
import { checkValidityError } from "../validate.js";

// Переменные для добавления начальных карточек

const templateParent = document.querySelector('.elements__list'); 
const templateCard = document.getElementById('element').content;

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

function createCard(item) { // Функция сбора карточки
    const cloneElement = templateCard.querySelector('.element').cloneNode(true);
    const cloneElementImage = cloneElement.querySelector('.element__image');
    
    cloneElementImage.src = item.link;
    cloneElementImage.alt = item.alt;
    cloneElement.querySelector('.element__title').textContent = item.title;

    const elementLike = cloneElement.querySelector('.element__like-icon'); //Добавляем слушатель лайка
    function addLike() {
        elementLike.classList.toggle('element__like-icon_active');
    }
    elementLike.addEventListener('click', () => addLike());

    const elementDelete = cloneElement.querySelector('.element__trash-icon'); //Добавляем слушатель корзины
    function deleteCard() {
        elementDelete.parentElement.remove();
    }
    elementDelete.addEventListener('click', () => deleteCard());

    const elementImageSrc = cloneElement.querySelector('.element__image'); //Добавляем слушатель окна просмотра изображения
    elementImageSrc.addEventListener('click', () => showPopupImage(elementImageSrc));
    
    return cloneElement;
}

function renderCards(param) { // Функция добавления карточки
    templateParent.prepend(param);
}

function changeProfile(evt) { // Сохраняем изменения в профиле
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup(popupProfile);
}

function addNewCard(event) { // Добавляем карточку
    event.preventDefault();

    const newCard = {};
    newCard.title = popupCardName.value;
    newCard.link = popupCardLink.value;
    newCard.alt = `Изображение ${newCard.title}`;

    renderCards(createCard(newCard)); // Генерируем новую карточку
    closePopup(popupCard);

    popupCardForm.reset();
}

function openPopup(popup) { // Открываем попап
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => {
        closePopupWithEsc(evt, popup);
    });
}

function closePopup(popup) { // Закрываем попап
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => {
        closePopupWithEsc(evt, popup);
    });
}

function showPopupImage(item) { // Функция открытия попапа просмотра
    openPopup(popupImage);

    showImage.src = item.src;
    showImage.alt = item.alt;
    showImageDescription.textContent = item.nextElementSibling.textContent;
}

initElements.forEach(item => { // Перебор массива
    const createNewCard = createCard(item);
    renderCards(createNewCard);
});

function closePopupWithEsc(evt, popup) { // Закрываем попап по нажатию на Esc
    if(evt.key === 'Escape') {
       popup.classList.remove('popup_opened'); 
    }
}

function closePopupWithOverlay(evt) { // Закрываем попап по клику на оверлэй
    if(evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget); 
    }
}

popupProfileForm.addEventListener('submit', evt => changeProfile(evt)); // Сохраняем изменения

popupCardForm.addEventListener('submit', evt => addNewCard(evt)); // Сохраняем изменения

popupProfileOpened.addEventListener('click', () => {
    checkValidityError(popupProfileForm);
    
    popupProfileName.value = profileName.textContent;
    popupProfileCaption.value = profileCaption.textContent;
    openPopup(popupProfile);
});

popupCardOpened.addEventListener('click', () => {
    checkValidityError(popupCardForm);
    popupCardForm.reset();
    openPopup(popupCard);
});

popups.forEach(item => {
    const popupButton = item.querySelector('.popup__close');
    popupButton.addEventListener('click', () => closePopup(item));

    item.addEventListener('click', closePopupWithOverlay);
});