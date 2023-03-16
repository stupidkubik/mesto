/* Выбираем кнопку редактирования профиля, 
кнопку закрытия поп-апа и сам поп-ап.
Затем через toggle добавляем или убираем класс, 
который переписывает display с none на flex */

let popupOpened = document.querySelector('.profile__edit');
let popupClosed = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

function switchPopup() {
    popup.classList.toggle('popup_opened');
}

popupOpened.addEventListener('click', switchPopup);
popupClosed.addEventListener('click', switchPopup);


/* Выбираем имя и описание профиля, а также поля ввода в поп-апе.
Затем вписываем значения из профиля в атрибуты value */

let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let popupProfileName = document.querySelector('.popup__profile-name');
let popupProfileCaption = document.querySelector('.popup__profile-caption');

popupProfileName.value = `${profileName.textContent}`;
popupProfileCaption.value = `${profileCaption.textContent}`;


/* Выбираем кнопку "Сохранить" и передаем ей значения из input поп-апа.
Ещё вызываем функцию закрытия поп-апа. */

let popupSubmit = document.querySelector('.popup__submit');

function changeProfile() {
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    
    switchPopup(); 
}

popupSubmit.addEventListener('click', changeProfile);