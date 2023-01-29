export class Card {
  constructor (dataCard, templateSelector, viewImage) {
    this._title = dataCard.name;
    this._link = dataCard.link;
    this._templateSelector = templateSelector;
    this._imageClickHendler = viewImage;
  }

  _createCardElement() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    
    return cardElement;
  }

  _setData() {
    const cardImage = this._newCard.querySelector('.card__image');
    const cardTitle =this._newCard.querySelector('.card__title');
    
    cardImage.alt = this._title;
    cardImage.src = this._link;
    cardTitle.textContent = this._title;
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
    likeButton.addEventListener('click', (event) => {
      this._toggleLike(event);
    });

    const viewImage = this._newCard.querySelector('.card__image');
    viewImage.addEventListener('click', () => {
      this._imageClickHendler(this._title, this._link);
    });

  }

  getCard() {
    this._newCard = this._createCardElement();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}