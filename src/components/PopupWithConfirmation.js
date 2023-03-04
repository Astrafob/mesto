import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementForm = this._popup.querySelector('.popup__edit-form');
    this._inputList = this._popup.querySelectorAll('.popup__input-text');
    this._saveButton = this._elementForm.querySelector('.popup__save-button');
  }

  handleFormSubmit(submit) {
    this._submit = submit;
  }

  addSaveState() {
    this._saveButton.textContent = 'Удаление...';
  }

  addStandartState() {
    this._saveButton.textContent = 'Да';
  }

  setEventListeners() {
    super.setEventListeners();
    this._elementForm.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submit();
    });
  }
}