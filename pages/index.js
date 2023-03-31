// import { initElements } from "../initElements";


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

function addCards(item) {// Общая функция добавления карточки
    const cloneElement = templateCard.querySelector('.element').cloneNode(true);
    
    cloneElement.querySelector('.element__image').src = item.link;
    cloneElement.querySelector('.element__image').alt = item.alt;
    cloneElement.querySelector('.element__title').textContent = item.title;

    const elementLike = cloneElement.querySelector('.element__like-icon'); //Добавляем слушатель лайка
    elementLike.addEventListener('click', () => addLike(item));

    const elementDelete = cloneElement.querySelector('.element__trash-icon'); //Добавляем слушатель корзины
    elementDelete.addEventListener('click', () => deleteCard(item));

    const elementImage = cloneElement.querySelector('.element__image'); //Добавляем слушатель окна просмотра изображения
    elementImage.addEventListener('click', () => showPopupImage(item));

    templateParent.prepend(cloneElement);

    return cloneElement;
}

initElements.forEach(item => addCards(item));

function addLike(param) {
    param.classList.toggle('element__like-icon_active');
}

function deleteCard(param) {
    param.remove();
}

function showPopupImage(param) {
    popupImage.classList.toggle('popup_opened');
    popupImagePicture.src = param.src;
    popupImageDescription.textContent = param.nextElementSibling.textContent;
}





//Общие переменные для попапов

const popupClosed = document.querySelectorAll('.popup__close');
const deleteButtons = document.querySelectorAll('.element__trash-icon');

// const popupForms = document.querySelectorAll('.popup__form');


// Переменные и логика для попапа с профилем

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpened = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const popupProfileForm = document.querySelector('.popup__form[name="profile-form"]');
const popupProfileName = document.querySelector('.popup__input_profile_name');
const popupProfileCaption = document.querySelector('.popup__input_profile_caption');

popupProfileName.value = profileName.textContent;
popupProfileCaption.value = profileCaption.textContent;

function openPopup(popup) { // Открываем попап
    popup.classList.add('popup_opened');
}

function closePopup(popup) { // Закрываем попап
    popup.classList.remove('popup_opened');
}

popupProfileOpened.addEventListener('click', evt => openPopup(evt));
popupClosed[0].addEventListener('click', evt => closePopup(evt));

popupProfileForm.addEventListener('submit', evt => changeProfile(evt)); // Сохраняем изменения

function changeProfile(evt) { //Сохраняем изменения в профиле
    evt.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup(evt);
}


// Переменные и логика для попапа с добавлением карточек

const popupCard = document.querySelector('.popup_type_add');
const popupCardOpened = document.querySelector('.profile__add-element');

const popupCardForm = document.querySelector('.popup__form[name="add-form"]');
const popupCardName = popupCardForm.querySelector('.popup__input_card_name');
const popupCardLink = popupCardForm.querySelector('.popup__input_card_link');

function showPopupCard() { // Открываем и закрываем  попап
    popupCard.classList.toggle('popup_opened');
}

popupCardOpened.addEventListener('click', showPopupCard);
popupClosed[1].addEventListener('click', showPopupCard);

function addNewCard(event) { // Добавляем карточку
    event.preventDefault();

    const newCard = {};
    newCard.title = popupCardName.value;
    newCard.link = popupCardLink.value;
    newCard.alt = `Изображение ${newCard.title}`;

    initElements.push(newCard);// Добавляем объект в массив
    addCards(initElements[initElements.length - 1]);// Генерируем новую карточку

    showPopupCard();
}

popupCardForm.addEventListener('submit', addNewCard); // Сохраняем изменения


// Переменные и логика для попапа просмотра



popupClosed[2].addEventListener('click', showPopupImage);



// Переписать попапы на таргет

// const popups = document.querySelectorAll('.popup');
// const

// popups.forEach(item => {
//     item.addEventListener('click', evt => {
//         openPopup(evt.target.parentElement);
//     })
// });

// function openPopup(param) {
//     param.classList.toggle('popup_opened');
// }