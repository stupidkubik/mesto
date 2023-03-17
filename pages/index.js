const popupOpened = document.querySelector('.profile__edit');
const popupClosed = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const popupForm = document.querySelector('.popup__form');
const popupProfileName = popupForm.querySelector('.popup__input_profile_name');
const popupProfileCaption = popupForm.querySelector('.popup__input_profile_caption');

function openPopup() {
    popupProfileName.value = `${profileName.textContent}`;
    popupProfileCaption.value = `${profileCaption.textContent}`;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupOpened.addEventListener('click', openPopup);
popupClosed.addEventListener('click', closePopup);


popupForm.addEventListener('submit', changeProfile);

function changeProfile(event) {
    event.preventDefault();
    profileName.textContent = popupProfileName.value;
    profileCaption.textContent = popupProfileCaption.value;
    closePopup();
}