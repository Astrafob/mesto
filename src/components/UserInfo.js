export default class UserInfo {
  constructor( {nameVisitor, jobVisitor} ) {
    this._nameVisitor = nameVisitor;
    this._jobVisitor = jobVisitor;
  }

  getUserInfo() {
    return {
      name: this._nameVisitor.textContent,
      job: this._jobVisitor.textContent
    };  
  }

  setUserInfo(data) {
    this._data = data;
    this._nameVisitor.textContent = this._data.name;
    this._jobVisitor.textContent = this._data.job;   
  }
}