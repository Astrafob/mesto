import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._elementForm = this._popup.querySelector('.popup__edit-form');
    this._inputList = this._popup.querySelectorAll('.popup__input-text');
    this._submitButton = this._elementForm.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }

  addSaveState() {
    this._submitButton.textContent = 'Сохранение...';
  }

  addStandartState() {
    this._submitButton.textContent = 'Сохранить';
  }

  setInputValues(data) {
    console.log(data);
    console.log(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name];
      console.log(inputElement.value);
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._elementForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._objectInputs = this._getInputValues();
      console.log(this._objectInputs);
      this._callbackSubmitForm(this._objectInputs);
    });
  }

  close() {
    super.close();
    this._elementForm.reset();
  }
}