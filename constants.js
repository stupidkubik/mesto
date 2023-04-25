export const initElements = [
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

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; // { 1, 2, ...restObj }