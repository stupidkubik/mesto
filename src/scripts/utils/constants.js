import californiaImage from '../../images/california.jpg';
import franceImage from '../../images/france.jpg';
import icelandImage from '../../images/iceland.jpg';
import indonesiaImage from '../../images/indonesia.jpg';
import thailandImage from '../../images/thailand.jpg';
import vietnamImage from '../../images/vietnam.jpg';

export const initElements = [
    {
        title: 'Индонезия',
        link: indonesiaImage,
    },
    {
        title: 'Исландия',
        link: icelandImage,
    },
    {
        title: 'Франция',
        link: franceImage,
    },
    {
        title: 'Калифорния',
        link: californiaImage,
    },
    {
        title: 'Таиланд',
        link: thailandImage,
    },
    {
        title: 'Вьетнам',
        link: vietnamImage,
    },
]

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
