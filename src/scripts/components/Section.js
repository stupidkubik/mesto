export class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderItems() {
        this._items.forEach((card) => {
            this.addItem(card);
        });
    }

    addItem(newCard) {
        this._container.prepend(this._renderer(newCard));
    }
}