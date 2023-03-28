//Общие переменные для попапов

const popupClosed = document.querySelectorAll('.popup__close');
const popupForm = document.querySelectorAll('.popup__form');


// Переменные и логика для попапа с профилем

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpened = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const popupProfileName = popupForm[0].querySelector('.popup__input_profile_name');
const popupProfileCaption = popupForm[0].querySelector('.popup__input_profile_caption');

function openPopupProfile() { // Открываем попап и вставляем значения
    popupProfileName.value = `${profileName.textContent}`;
    popupProfileCaption.value = `${profileCaption.textContent}`;
    popupProfile.classList.add('popup_opened');
}

function closePopupProfile() { // Закрываем попап
    popupProfile.classList.remove('popup_opened');
}

popupProfileOpened.addEventListener('click', openPopupProfile);
popupClosed[0].addEventListener('click', closePopupProfile);

popupForm[0].addEventListener('submit', changeProfile); // Сохраняем изменения

function changeProfile(event) { //Сохраняем изменения в профиле
    event.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup();
}


// Переменные и логика для попапа с добавлением карточек

const popupCard = document.querySelector('.popup_type_add');
const popupCardOpened = document.querySelector('.profile__add-element');
const cardName = document.querySelector('.popup__input_card_name');
const cardLink = document.querySelector('.popup__input_card_link');

function showPopupCard() { // Открываем и закрываем  попап
    popupCard.classList.toggle('popup_opened');
}

popupCardOpened.addEventListener('click', showPopupCard);
popupClosed[1].addEventListener('click', showPopupCard);


// Переменные для добавления начальных карточек

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

for (let index = 0; index < initElements.length; index++) {// Цикл для добавления карточек из template
    const cloneElement = templateCard.querySelector('.element').cloneNode(true);

    cloneElement.querySelector('.element__image').src = initElements[index].link;
    cloneElement.querySelector('.element__image').alt = initElements[index].alt;
    cloneElement.querySelector('.element__title').textContent = initElements[index].title;

    templateParent.appendChild(cloneElement);
}