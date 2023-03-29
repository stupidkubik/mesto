// Переменные и логика для добавления начальных карточек

const templateParent = document.querySelector('.elements__list'); 
const templateCard = document.getElementById('element').content;
let deleteButton = document.querySelectorAll('.element__trash-icon');
console.log(deleteButton);

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
    elementLike.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-icon_active');
    });

    const elementDelete = cloneElement.querySelector('.element__trash-icon'); //Добавляем слушатель корзины
    elementDelete.addEventListener('click', evt => {
        const deleteItem = evt.target.parentElement;
        deleteItem.remove();
    });

    templateParent.prepend(cloneElement);

    deleteButton = document.querySelectorAll('.element__trash-icon');//Обновляем нодлист
}

document.addEventListener('DOMContentLoaded', initElements.forEach(item => {
    addCards(item); 
}));


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
const popupCardName = popupForm[1].querySelector('.popup__input_card_name');
const popupCardLink = popupForm[1].querySelector('.popup__input_card_link');

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

popupForm[1].addEventListener('submit', addNewCard); // Сохраняем изменения


// Переменные и логика для попапа просмотра

const popupGallery = document.querySelector('.popup_type_gallery');
const popupGalleryOpened = document.querySelector('.element__container');
const popupGalleryImage = document.querySelector('.popup__gallery');
const popupGalleryDescription = document.querySelector('.popup__description');

function showPopupGallery() {
    popupGallery.classList.toggle('popup_opened'); 
}

popupGalleryOpened.addEventListener('click', showPopupGallery);
popupClosed[2].addEventListener('click', showPopupGallery);

// Переписать попапы на таргет