export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = containerSelector;
    this._renderer = renderer;
  }

  rendererItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item);

    });
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }
}