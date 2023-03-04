export const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button-type-inactive',
  inputErrorBorderClass: 'popup__input-text_type_error',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'c9936e4c-070a-4b7d-9c19-b49f7cce0362',
    'Content-Type': 'application/json'
  }
};