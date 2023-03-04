export class Card {
  constructor (dataCard, templateSelector, handleCardClick, handleCardDelete, handleLike, handleLikeDelete) {
    this._title = dataCard.name;
    this._link = dataCard.link;
    this.idCard = dataCard._id;
    this._idUser = dataCard.idUser;
    this._isOwner = dataCard.owner;
    this.arrLikes = dataCard.likes;
    this._templateSelector = templateSelector;
    this._handleLike = handleLike;
    this._handleLikeDelete = handleLikeDelete;
    this._imageClickHandler = handleCardClick;
    this._deleteCardHandler = handleCardDelete;
    this._newCard = this._createCardElement();
    this._newCard.isLiked = dataCard.isLiked;
    this._likeButton = this._newCard.querySelector('.card__button-like');
    this._likeCounter = this._newCard.querySelector('.card__like-counter'); 
    this._deleteButton = this._newCard.querySelector('.card__delete');
    this._viewImage = this._newCard.querySelector('.card__image');
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
    const cardTitle = this._newCard.querySelector('.card__title');
    
    this._viewImage.alt = this._title;
    this._viewImage.src = this._link;
    cardTitle.textContent = this._title;

    this._newCard.id = this.idCard;
    this._newCard.owner = this._isOwner;

    if (this.arrLikes.find(element => element._id === this._idUser)) {
      this._newCard.isLiked = true;
      this._likeButton.classList.add('card__button-like_active');
    } else {
      this._newCard.isLiked = false;
      this._likeButton.classList.remove('card__button-like_active');
    }
    
    if (this._newCard.owner._id === this._idUser) {
      this._newCard.isMine = true;
    } else {
      this._newCard.isMine = false;
      this._deleteButton.style = 'visibility: hidden;';
    }
    this._likeCounter.textContent = this.arrLikes.length;
  }

  deleteCardElement() {
    this._newCard.remove();
    this._newCard = null;
  }

  likeCard(dataCard, isLiked) {
    if (isLiked) {
      this._handleLikeDelete(dataCard);
    } else this._handleLike(dataCard);
  }

  setLike(data) {
    console.log(data.likes);
    if (data.likes.find(element => element._id === this._idUser)) {
      this._newCard.isLiked = true;
      this._likeButton.classList.add('card__button-like_active');
     } else {
      this._newCard.isLiked = false;
      this._likeButton.classList.remove('card__button-like_active');
     }
    this._likeCounter.textContent = data.likes.length;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardHandler(this);
    });

    this._likeButton.addEventListener('click', () => {
      this.likeCard(this, this._newCard.isLiked);
    });

    this._viewImage.addEventListener('click', () => {
      this._imageClickHandler(this._title, this._link);
    });

  }

  getCard() {
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }

}