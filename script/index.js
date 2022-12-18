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

// Функция открытия попапа
function openPopup(modalElement) {
  const popup = modalElement.closest('.popup');
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(modalElement) {
  const popup = modalElement.closest('.popup');
  popup.classList.remove('popup_opened');
}

//Открытие поп-апа "редактор профиля"
function openPopupEditProfile() {
  nameImput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupEditProfile);
}

//Открытие поп-апа "добавление карточки"
function openPopupAddCard() {
  placeName.value = '';
  placePhotoURL.value = '';

  openPopup(popupAddCard);
}

// Открытие поп-апа "просмотр фото"
const viewImage = (event) => {
  photo.src = event.target.getAttribute('src');
  photo.alt = event.target.getAttribute('alt');
  caption.textContent = event.target.parentElement.querySelector('.card__title').textContent;

  openPopup(popupImage);
};

// Закрытие всех попапов на крестик
buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (event) => {
    closePopup(event.target);
  });
});

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
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
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
  window.initialCards.forEach((card) => {
    createCard(card);
  });
};
createCards();

//перенос значений формы на страницу
function handleFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameImput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// Добавление новой карточки с помощью формы
function createNewCardFormSubmit(event) {
  event.preventDefault();

  const card = {};

  card.name = placeName.value;
  card.link = placePhotoURL.value;

  createCard(card);
  closePopup(popupAddCard);
}

formElement.addEventListener('submit', handleFormSubmit);  //Слушатель формы "редактор профиля"

formBlock.addEventListener('submit', createNewCardFormSubmit); //Слушатель формы "создание карточки"

buttonProfileEdit.addEventListener('click', openPopupEditProfile);  //Слушатель кнопки "редактор профиля"

buttonAddCard.addEventListener('click', openPopupAddCard);  //Слушатель кнопки "добавление карточки"