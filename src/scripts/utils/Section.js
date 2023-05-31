export class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this.renderer = renderer;
        this._container = document.querySelector(container);
    }

    renderItems() {
        this._items.forEach((card) => {
            this.addItem(this.renderer(card));
        });
    }

    addItem(newCard) {
        this._container.prepend(newCard);
    }
}