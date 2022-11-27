
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const buttonProfileEdit = profile.querySelector('.button_edit');
const buttonClosePopup = popup.querySelector('.popup__close-button');

const formElement = popup.querySelector('.popup__edit-form');
const nameImput = popup.querySelector('.popup__visitor-name');
const jobInput = popup.querySelector('.popup__about-the-visitor');

function openPopup() {
  popup.classList.add('popup_opened');
}

buttonProfileEdit.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();

  let profileName = profile.querySelector('.profile__title');
  let profileJob = profile.querySelector('.profile__subtitle');

  profileName.textContent = nameImput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);