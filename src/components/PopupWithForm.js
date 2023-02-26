import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._elementForm = this._popup.querySelector('.popup__edit-form');
    this._inputList = this._popup.querySelectorAll('.popup__input-text');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputElement) => {
      this._inputValues[inputElement.name] = inputElement.value;
    });
    return this._inputValues;
  }
  

  setEventListeners() {
    super.setEventListeners();
    this._elementForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._objectInputs = this._getInputValues();
      this._callbackSubmitForm(this._objectInputs);

      this.close();
    });
  }

  close() {
    super.close();
    this._elementForm.reset();
  }
}