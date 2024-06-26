import { Component } from "./base/Component";
import { createElement, ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/Events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', container);
        this._button = this.container.querySelector('.basket__button');

        this.items = [];
        this.toggleButton(true);

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }
    }

    toggleButton(state: boolean) {
        this.setDisabled(this._button, state);
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.toggleButton(false)
        } else {
            this.removeAllItemsFromBasket();
        }
    }
    
    set total(total: number) {
        this.setText(this._total, `${total} синапсов`);
    }

    removeAllItemsFromBasket(): void {
        this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
            textContent: 'Корзина пуста'
        }));
        this.toggleButton(true);
    }
}