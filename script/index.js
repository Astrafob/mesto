
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const buttonProfileEdit = profile.querySelector('.button_edit_open');
const buttonClosePopup = popup.querySelector('.popup__close-button');

const formElement = popup.querySelector('.popup__edit-form');
const nameImput = popup.querySelector('#nameVisitor');
const jobInput = popup.querySelector('#jobVisitor');

const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');

const cards = document.querySelector('.cards');
const buttonLike = cards.querySelectorAll('.card__button-like');

//Открытие поп-апа
function openPopup() {
  popup.classList.add('popup_opened');
  
  nameImput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Закрытие поп-апа
function closePopup() {
  popup.classList.remove('popup_opened');
}

//перенос значений формы на страницу
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameImput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

//закрашиваем сердечки
const onClick = (event) => {
  event.target.classList.toggle('card__button-like_active');
};

buttonLike.forEach((element) => element.addEventListener('click', onClick));

buttonProfileEdit.addEventListener('click', openPopup);

buttonClosePopup.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
