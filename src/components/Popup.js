export class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  open() {
    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
    this._selector.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
    this._selector.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('popup_opened') || 
        event.target.classList.contains('popup__close-button')
      ) {
        this.close();
      }
    });
  }
}