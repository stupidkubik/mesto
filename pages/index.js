// import { initElements } from "../initElements.js";

// Переменные и логика для добавления начальных карточек

const templateParent = document.querySelector('.elements__list'); 
const templateCard = document.getElementById('element').content;

const initElements = [
    {
        title: 'Индонезия',
        link: './images/indonesia.jpg',
        alt: 'Вид на рисовые поля на Бали'
    },
    {
        title: 'Исландия',
        link: './images/iceland.jpg',
        alt: 'Вид на водопад Деттифосс'
    },
    {
        title: 'Франция',
        link: './images/france.jpg',
        alt: 'Вид на Эйфелеву башню сковзь деревья'
    },
    {
        title: 'Калифорния',
        link: './images/california.jpg',
        alt: 'Вид на мост Золотые ворота в тумане'
    },
    {
        title: 'Таиланд',
        link: './images/thailand.jpg',
        alt: 'Вид на храм Ват Ронг Кхун в Чианграе'
    },
    {
        title: 'Вьетнам',
        link: './images/vietnam.jpg',
        alt: 'Вид на закатное небо через кокосовые пальмы'
    },
]

function addCards(item) {// Функция сбора карточки
    const cloneElement = templateCard.querySelector('.element').cloneNode(true);
    
    cloneElement.querySelector('.element__image').src = item.link;
    cloneElement.querySelector('.element__image').alt = item.alt;
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

function renderCards(param) {//Функция добавления карточки
    templateParent.prepend(param);
}

initElements.forEach(item => {// Перебор массива
    const createNewCard = addCards(item);
    renderCards(createNewCard);
});


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


// Переменные и логика для попапа с профилем

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const popupProfileName = document.querySelector('.popup__input_profile_name');
const popupProfileCaption = document.querySelector('.popup__input_profile_caption');

popupProfileName.value = profileName.textContent;
popupProfileCaption.value = profileCaption.textContent;

function changeProfile(evt) { //Сохраняем изменения в профиле
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup(popupProfile);
}
popupProfileForm.addEventListener('submit', evt => changeProfile(evt)); // Сохраняем изменения


// Переменные и логика для попапа с добавлением карточек

let popupCardName = popupCardForm.querySelector('.popup__input_card_name');
let popupCardLink = popupCardForm.querySelector('.popup__input_card_link');

function addNewCard(event) { // Добавляем карточку
    event.preventDefault();

    const newCard = {};
    newCard.title = popupCardName.value;
    newCard.link = popupCardLink.value;
    newCard.alt = `Изображение ${newCard.title}`;

    initElements.push(newCard);// Добавляем объект в массив

    renderCards(addCards(initElements[initElements.length - 1]));// Генерируем новую карточку

    closePopup(popupCard);

    popupCardName.value = '';
    popupCardLink.value = '';
}
popupCardForm.addEventListener('submit', evt => addNewCard(evt)); // Сохраняем изменения


// Открываем и закрываем попапы

function openPopup(popup) { // Открываем попап
    popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрываем попап
    popup.classList.remove('popup_opened');
}

popupProfileOpened.addEventListener('click', () => openPopup(popupProfile));

popupCardOpened.addEventListener('click', () => openPopup(popupCard));

popups.forEach(item => {
    const popupButton = item.querySelector('.popup__close');
    popupButton.addEventListener('click', () => closePopup(item));
});

function showPopupImage(item) {// Функция открытия попапа просмотра
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = item.src;
    popupImage.querySelector('.popup__description').textContent = item.nextElementSibling.textContent;
}