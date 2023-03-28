//Переменные для окна попапа

const popupOpened = document.querySelector('.profile__edit');
const popupClosed = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

// Переменные для попапа с профилем

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const popupForm = document.querySelector('.popup__form');
const popupProfileName = popupForm.querySelector('.popup__input_profile_name');
const popupProfileCaption = popupForm.querySelector('.popup__input_profile_caption');



function openPopup() { // Открываем попап и вставляем значения
    popupProfileName.value = `${profileName.textContent}`;
    popupProfileCaption.value = `${profileCaption.textContent}`;
    popup.classList.add('popup_opened');
}

function closePopup() { // Закрываем попап
    popup.classList.remove('popup_opened');
}

popupOpened.addEventListener('click', openPopup);
popupClosed.addEventListener('click', closePopup);


popupForm.addEventListener('submit', changeProfile); // Сохраняем изменения

function changeProfile(event) { //Сохраняем изменения в профиле
    event.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup();
}

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