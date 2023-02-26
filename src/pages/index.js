import { validationConfig, initialCards } from '../utils/constants.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import './index.css';

import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupAddCard = document.querySelector('#popupAddCard');
const popupImage = document.querySelector('#popupViewPhoto');
const profile = document.querySelector('.profile');
const cards = document.querySelector('.cards');

const buttonProfileEdit = profile.querySelector('.button_edit_open');
const buttonAddCard = profile.querySelector('.button_add_open');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');

// const formProfile = popupEditProfile.querySelector('.popup__edit-form');
const nameImput = popupEditProfile.querySelector('#nameVisitor');
const jobInput = popupEditProfile.querySelector('#jobVisitor');

// const formAddCard = popupAddCard.querySelector('.popup__edit-form');
// const placeName = popupAddCard.querySelector('#placeName');
// const placePhotoURL = popupAddCard.querySelector('#placePhotoURL');

// const photo = popupImage.querySelector('img');
// const caption = popupImage.querySelector('.popup__caption-image');

const popupEditProfileValidation = new FormValidator(validationConfig, popupEditProfile);
const popupAddCardValidation = new FormValidator(validationConfig, popupAddCard);
const defaultSection = new Section({ 
  items: initialCards, 
  renderer: (item) => { 
    defaultSection.addItem(createCard(item));
  } 
}, cards);
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, handleSubmitEditProfile);
const popupAddCardElement = new PopupWithForm(popupAddCard, handleSubmitAddCard);
const userInfo = new UserInfo( {nameVisitor: profileName, jobVisitor: profileJob} );

const openPopupWithImage = (title, link) => {
  popupWithImage.open(title, link);
};

const createCard = (dataCard) => {
  const card = new Card(dataCard, '#card', openPopupWithImage);
  const cardElement = card.getCard();
  return cardElement;
};

function handleSubmitEditProfile(objectInputs) {
  userInfo.setUserInfo(objectInputs);
}

function handleSubmitAddCard(objectInputs) {
  defaultSection.addItem(createCard(objectInputs));
}

buttonProfileEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  console.log(userData);
  nameImput.value = userData.name;
  jobInput.value = userData.job;
  popupProfile.open();
});

buttonAddCard.addEventListener('click', () => {
  popupAddCardElement.open();
});

popupEditProfileValidation.enableValidation(); // Подключаем валидацию
popupAddCardValidation.enableValidation();

defaultSection.rendererItems(); // Рендерим шаблонные карточки

// раскидываем слушатели
popupProfile.setEventListeners();
popupAddCardElement.setEventListeners();
popupWithImage.setEventListeners();

// const handleCardCreate = (dataCard) => {
//   cards.prepend(createCard(dataCard));
// };

// // Рендер шаблона карточек
// const createCards = () => {
//   initialCards.forEach((dataCard) => {
//     handleCardCreate(dataCard);
//   });
// };
// createCards();


// // Функция открытия попапа
// function openPopup(modalElement) {
//   const popup = modalElement.closest('.popup');
//   document.addEventListener('keydown', closePopupOnEsc);
//   popup.classList.add('popup_opened');
// }

// // Функция закрытия попапа
// function closePopup(modalElement) {
//   const popup = modalElement.closest('.popup');
//   document.removeEventListener('keydown', closePopupOnEsc);
//   popup.classList.remove('popup_opened');
// }

// //Открытие поп-апа "редактор профиля"
// function openPopupEditProfile() {

//   nameImput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;

//   openPopup(popupEditProfile);
// }

// //Открытие поп-апа "добавление карточки"
// function openPopupAddCard() {
//   formAddCard.reset();

//   popupAddCardValidation.resetValidation();

//   openPopup(popupAddCard);
// }

// // Закрытие поп-апа по кнопке 'ESC'
// const closePopupOnEsc = (event) => {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// };

// Закрытие всех попапов на крестик или через клик на оверлей
// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (event) => {
//         if (event.target.classList.contains('popup_opened')) {
//             closePopup(popup);
//         }
//         if (event.target.classList.contains('popup__close-button')) {
//           closePopup(popup);
//         }
//     });
// });

// // Открытие поп-апа "просмотр фото"

// const handleCardClick = (title, link) => {
//   photo.src = link;
//   photo.alt = title;
//   caption.textContent = title;

//   openPopup(popupImage);
// };

// //перенос значений формы на страницу
// function handleProfileFormSubmit(event) {
//   event.preventDefault();

//   profileName.textContent = nameImput.value;
//   profileJob.textContent = jobInput.value;

//   closePopup(popupEditProfile);
// }

// // Добавление новой карточки с помощью формы
// function createNewCard(event) {
//   event.preventDefault();

//   const card = {};

//   card.name = placeName.value;
//   card.link = placePhotoURL.value;

//   handleCardCreate(card);

//   formAddCard.reset();

//   closePopup(popupAddCard);
// }



// formProfile.addEventListener('submit', handleProfileFormSubmit);  //Слушатель формы "редактор профиля"

// formAddCard.addEventListener('submit', createNewCard); //Слушатель формы "создание карточки"

// buttonProfileEdit.addEventListener('click', openPopupEditProfile);  //Слушатель кнопки "редактор профиля"

// buttonAddCard.addEventListener('click', openPopupAddCard);  //Слушатель кнопки "добавление карточки"