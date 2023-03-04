import { validationConfig, apiConfig } from '../utils/constants.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import './index.css';

import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';

// const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupAddCard = document.querySelector('#popupAddCard');
const popupEditAvatarProfile = document.querySelector('#popupEditAvatarProfile');
const popupImage = document.querySelector('#popupViewPhoto');
const popupDeleteCard = document.querySelector('#popupDeleteCard');
const profile = document.querySelector('.profile');
const cards = document.querySelector('.cards');

const buttonProfileEdit = profile.querySelector('.button_edit_open');
const buttonAddCard = profile.querySelector('.button_add_open');
const buttonEditAvatar = profile.querySelector('.profile__avatar-edit');
const profileName = profile.querySelector('.profile__title');
const profileAbout = profile.querySelector('.profile__subtitle');
const avatarProfile = profile.querySelector('.profile__photo');

const nameImput = popupEditProfile.querySelector('#name');
const jobInput = popupEditProfile.querySelector('#about');
// const formProfile = popupEditProfile.querySelector('.popup__edit-form');
// const formAddCard = popupAddCard.querySelector('.popup__edit-form');
// const placeName = popupAddCard.querySelector('#placeName');
// const placePhotoURL = popupAddCard.querySelector('#placePhotoURL');

// const photo = popupImage.querySelector('img');
// const caption = popupImage.querySelector('.popup__caption-image');

const popupEditProfileValidation = new FormValidator(validationConfig, popupEditProfile);
const popupAddCardValidation = new FormValidator(validationConfig, popupAddCard);
const popupEditAvatarProfileValidation = new FormValidator(validationConfig, popupEditAvatarProfile);
const defaultSection = new Section({ 
  renderer: (item) => { 
    defaultSection.addItemAppend(createCard(item));
  } 
}, cards);
const popupWithImage = new PopupWithImage(popupImage);
const popupProfile = new PopupWithForm(popupEditProfile, handleSubmitEditProfile);
const popupAddCardElement = new PopupWithForm(popupAddCard, handleSubmitAddCard);
const popupEditAvatar = new PopupWithForm(popupEditAvatarProfile, handleSubmitEditAvatar);
const popupConfirmation = new PopupWithConfirmation(popupDeleteCard);
const userInfo = new UserInfo( {name: profileName, about: profileAbout}, avatarProfile );
const api = new Api(apiConfig);

Promise.all([api.getPersonInfo(), api.getCards()])
  .then(([dataUser, card]) => {
    userInfo.setUserInfo(dataUser);
    userInfo.setUserAvatar(dataUser);
    defaultSection.rendererItems(card);
  })
  .catch((error) => {
    console.log(error);
  });

const createCard = (dataCard) => {
  dataCard.idUser = userInfo.getPersonId();
  const card = new Card(dataCard, '#card', openPopupWithImage, handleDeleteCard, addLike, deleteLike);
  const cardElement = card.getCard();
  return cardElement;
};

const openPopupWithImage = (title, link) => {
  popupWithImage.open(title, link);
};

const addLike = (card) => {
  console.log(card.idCard);
  api.addLikeCard(card.idCard)
    .then((res) => {
      console.log(res);
      card.setLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLike = (card) => {
  api.deleteLikeCard(card.idCard)
    .then((res) => {
      card.setLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleSubmitEditProfile(objectInputs) {
  // userInfo.setUserInfo(objectInputs);
  popupProfile.addSaveState();
  api.editProfile(objectInputs)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.addStandartState();
    });
}

function handleSubmitAddCard(objectInputs) {
  // defaultSection.addItem(createCard(objectInputs));
  popupAddCardElement.addSaveState();
  api.addCard(objectInputs)
    .then((res) => {
      popupAddCardElement.close();
      defaultSection.addItemPrepend(createCard(res));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCardElement.addStandartState();
    });
}

function handleSubmitEditAvatar(objectInputs) {
  // avatarProfile.src = objectInputs.link;
  popupEditAvatar.addSaveState();
  api.editProfileImage(objectInputs)
    .then((res) => {
      console.log(objectInputs);
      popupEditAvatar.close();
      userInfo.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.addStandartState();
    });
}

function handleDeleteCard(dataCard) {
  popupConfirmation.open();
  popupConfirmation.handleFormSubmit( function() {
    popupConfirmation.addSaveState();
    api.deleteCard(dataCard.idCard)
      .then(() => {
        dataCard.deleteCardElement();
      })
      .then(() => {
        popupConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupConfirmation.addStandartState();
      });
  });

}

buttonProfileEdit.addEventListener('click', () => {
  // const userData = userInfo.getUserInfo();
  // nameImput.value = userData.name;
  // jobInput.value = userData.about;
  // popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

buttonAddCard.addEventListener('click', () => {
  popupAddCardElement.open();
});

buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});

popupEditProfileValidation.enableValidation(); // Подключаем валидацию
popupAddCardValidation.enableValidation();
popupEditAvatarProfileValidation.enableValidation();

// раскидываем слушатели
popupProfile.setEventListeners();
popupAddCardElement.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupConfirmation.setEventListeners();

// api.getCards().then((res) => {
//   if(res.ok) {
//     return res.json();
//   } else {
//     return console.log('api.getCards Error');
//   }
// }).then((data) => {
//   defaultSection.rendererAll(data);
//   })
//   .catch(err => console.log(err));

// api.getPersonInfo().then((res) => {
//   if(res.ok) {
//     return res.json();
//   } else {
//     return console.log('api.PersonInfo Error');
//   }
// }).then((data) => {
//   userInfo.setUserInfo(data);
//   userInfo.setUserAvatar(data);
// }).catch(err => console.log(err));

