const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const buttonsSavePopup = document.querySelectorAll('.popup__save-button');
const popupEditProfile = document.querySelector('#popupEditProfile');
const cardTemplate = document.querySelector('#card').content;
const popupAddCard = document.querySelector('#popupAddCard');
const popupImage = document.querySelector('#popupViewPhoto');
const profile = document.querySelector('.profile');
const cards = document.querySelector('.cards');

const buttonProfileEdit = profile.querySelector('.button_edit_open');
const buttonAddCard = profile.querySelector('.button_add_open');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');

const formElement = popupEditProfile.querySelector('.popup__edit-form');
const nameImput = popupEditProfile.querySelector('#nameVisitor');
const jobInput = popupEditProfile.querySelector('#jobVisitor');

const formBlock = popupAddCard.querySelector('.popup__edit-form');
const placeName = popupAddCard.querySelector('#placeName');
const placePhotoURL = popupAddCard.querySelector('#placePhotoURL');

const buttonLike = cards.querySelectorAll('.card__button-like');
const buttonDelete = cards.querySelectorAll('.card__delete');
const cardImage = cards.querySelectorAll('img');

const photo = popupImage.querySelector('img');
const caption = popupImage.querySelector('.popup__caption-image');

// Открытие поп-апа "просмотр фото"
const viewImage = (event) => {
  photo.src = event.target.getAttribute('src');
  photo.alt = event.target.getAttribute('alt');
  caption.textContent = event.target.parentElement.querySelector('.card__title').textContent;
  popupImage.classList.add('popup_opened');
};

// Обработка клика по иконке "лайк"
const likeImage = (event) => {
  event.target.classList.toggle('card__button-like_active');
};

// Обработка клика по иконке "удалить"
const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

// Создание новой карточки
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');

  cardImageElement.alt = card.name;
  cardImageElement.src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__button-like').addEventListener('click', likeImage);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
  cardImageElement.addEventListener('click', viewImage);

  cards.prepend(cardElement);
}

// Рендер шаблона карточек
const createCards = () => {
  initialCards.forEach((card) => {
    createCard(card);
  });
};
createCards();

//Открытие поп-апа "редактор профиля"
function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');

  nameImput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Открытие поп-апа "добавление карточки"
function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');

  placeName.value = '';
  placePhotoURL.value = '';
}

//перенос значений формы на страницу
function handleFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameImput.value;
  profileJob.textContent = jobInput.value;
}

// Добавление новой карточки с помощью формы
function createFormSubmit(event) {
  event.preventDefault();

  const card = {};

  card.name = placeName.value;
  card.link = placePhotoURL.value;

  createCard(card);
}

// Закрытие всех попапов на крестик
buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_opened');
  });
});

// Закрытие попапов редактировани и создания на кнопку "сохранить"
buttonsSavePopup.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_opened');
  });
});

buttonProfileEdit.addEventListener('click', openPopupEditProfile);  //Слушатель кнопки "редактор профиля"

buttonAddCard.addEventListener('click', openPopupAddCard);  //Слушатель кнопки "добавление карточки"

formElement.addEventListener('submit', handleFormSubmit);  //Слушатель формы "редактор профиля"

formBlock.addEventListener('submit', createFormSubmit); //Слушатель формы "создание карточки"