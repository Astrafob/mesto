export default class UserInfo {
  constructor( {name, about}, avatar) {
    this._name = name;
    this._about = about;
    this._imageProfile = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };  
  }

  setUserInfo(data) {
    this._data = data;
    this._name.textContent = data.name;
    this._about.textContent = data.about;   
  }

  setUserAvatar(data) {
    this._data = data;
    this._imageProfile.src = this._data.avatar;
  }

  getPersonId() {
    this._idUser = this._data._id;
    return this._idUser;
  }
}