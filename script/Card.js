export class Card {
  constructor (dataCard, templateSelector, viewImage) {
    this._title = dataCard.name;
    this._link = dataCard.link;
    this._templateSelector = templateSelector;
    this._viewImage = viewImage;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.card')
    .cloneNode(true);
    
    return cardElement;
  }

  _setData() {
    this._newCard.querySelector('.card__image').alt = this._title;
    this._newCard.querySelector('.card__image').src = this._link;
    this._newCard.querySelector('.card__title').textContent = this._title;
  }

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _toggleLike(event) {
    event.target.classList.toggle('card__button-like_active');
  }

  _setEventListeners() {
    const deleteButton = this._newCard.querySelector('.card__delete');
    deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    const likeButton = this._newCard.querySelector('.card__button-like');
    likeButton.addEventListener('click', () => {
      this._toggleLike(event);
    });

    const viewImage = this._newCard.querySelector('.card__image');
    viewImage.addEventListener('click', () => {
      this._viewImage(this._title, this._link);
    });

  }

  getCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}