import { Component } from "./base/Component";
import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";

interface IProductActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    
    protected _title: HTMLElement;
    protected _description?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _index?: HTMLElement;

    constructor(protected container: HTMLElement, actions?: IProductActions) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._description = container.querySelector('.card__description');
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._price = container.querySelector('.card__price');
        this._category = container.querySelector('.card__category');
        this._button = container.querySelector('.card__button');
        this._index = container.querySelector('.basket__item-index');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set description(value: string) {
		this.setText(this._description, value);
	}

	get description() {
		return this._description.textContent || '';
	}
    
    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set price(value: string) {
        this.setDisabled(this._button, !value);
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
    }
    
    get price(): string {
        return this._price.textContent || '';
    }

    set category(value: string) {
		this.setText(this._category, value);

        if (value == 'софт-скил') {
            this._category.classList.add('card__category_soft')
        } else if (value == 'хард-скил') {
            this._category.classList.add('card__category_hard')
        } else if (value == 'кнопка') {
            this._category.classList.add('card__category_button')
        } else if (value == 'другое') {
            this._category.classList.add('card__category_other')
        } else {
            this._category.classList.add('card__category_additional')
        }
    }

	get category() {
		return this._category.textContent || '';
	}

    set button(value: string) {
        this.setText(this._button, value);
    }

    set index(value: string) {
        this._index.textContent = value;
    }
    
    get index(): string {
        return this._index.textContent || '';
    }
}