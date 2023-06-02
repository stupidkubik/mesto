export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((card) => {
            this.renderCard(card);
        });
    }

    renderCard(cardData) {
        this._addItem(this._renderer(cardData));
    }

    _addItem(newCard) {
        this._container.prepend(newCard);
    }
}