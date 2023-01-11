const popups = document.querySelectorAll('.popup');
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

const formProfile = popupEditProfile.querySelector('.popup__edit-form');
const nameImput = popupEditProfile.querySelector('#nameVisitor');
const jobInput = popupEditProfile.querySelector('#jobVisitor');

const formAddCard = popupAddCard.querySelector('.popup__edit-form');
const placeName = popupAddCard.querySelector('#placeName');
const placePhotoURL = popupAddCard.querySelector('#placePhotoURL');

const photo = popupImage.querySelector('img');
const caption = popupImage.querySelector('.popup__caption-image');

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button-type-inactive',
  inputErrorBorderClass: 'popup__input-text_type_error',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
};

// Функция открытия попапа
function openPopup(modalElement) {
  const popup = modalElement.closest('.popup');
  document.addEventListener('keydown', closePopupOnEsc);
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(modalElement) {
  const popup = modalElement.closest('.popup');
  document.removeEventListener('keydown', closePopupOnEsc);
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
  openPopup(popupAddCard);
}

// Закрытие поп-апа по кнопке 'ESC'
const closePopupOnEsc = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Открытие поп-апа "просмотр фото"
const viewImage = (title, link) => {
  photo.src = link;
  photo.alt = title;
  caption.textContent = title;

  openPopup(popupImage);
};

// Закрытие всех попапов на крестик или через клик на оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (event.target.classList.contains('popup__close-button')) {
          closePopup(popup);
        }
    });
});

// Обработка клика по иконке "лайк"
const toggleLike = (event) => {
  event.target.classList.toggle('card__button-like_active');
};

// Обработка клика по иконке "удалить"
const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

// Создание шаблона карточек
function getCard(title, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');

  cardImageElement.alt = title;
  cardImageElement.src = link;
  cardElement.querySelector('.card__title').textContent = title;

  cardElement.querySelector('.card__button-like').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
  cardImageElement.addEventListener('click', () => viewImage(title, link));

  return cardElement;
}

// Вставляем карточки в DOM
function createCard(title, link) {
  const cardElement = getCard(title, link);
  cards.prepend(cardElement);  
}

// Рендер шаблона карточек
const createCards = () => {
  initialCards.forEach((card) => {
    createCard(card.name, card.link);
  });
};
createCards();

//перенос значений формы на страницу
function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameImput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// Добавление новой карточки с помощью формы
function createNewCard(event) {
  event.preventDefault();

  const card = {};

  card.name = placeName.value;
  card.link = placePhotoURL.value;

  createCard(card.name, card.link);

  formAddCard.reset();

  closePopup(popupAddCard);
}



formProfile.addEventListener('submit', handleProfileFormSubmit);  //Слушатель формы "редактор профиля"

formAddCard.addEventListener('submit', createNewCard); //Слушатель формы "создание карточки"

buttonProfileEdit.addEventListener('click', openPopupEditProfile);  //Слушатель кнопки "редактор профиля"

buttonAddCard.addEventListener('click', openPopupAddCard);  //Слушатель кнопки "добавление карточки"


enableValidation(validationConfig); // Подключаем валидацию