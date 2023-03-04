import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaptionImage = this._popup.querySelector('.popup__caption-image');
  }

  open(title, link) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupCaptionImage.textContent = title;

    super.open();
  }

  // close() {
  //   super.close();
  // }

  // setEventListeners() {
  //   super.setEventListeners();
  // }

}