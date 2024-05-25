import { Component } from "./base/Component";
import { IProduct, IProductActions } from "../types";
import { ensureElement } from "../utils/utils";

export class Card extends Component<IProduct> {
    
    protected _title: HTMLElement;
    protected _description?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _price: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _basketIndex?: HTMLElement;

    constructor(protected container: HTMLElement, actions?: IProductActions) {
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._description = container.querySelector('.card__description');
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._price = container.querySelector('.card__price');
        this._category = container.querySelector('.card__category');
        this._basketIndex = container.querySelector('.basket__item-index');
        this._button = container.querySelector(`.card__button`);

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

    set title(value: string) {
        this.setText(this._title, value);
    }

    set description(value: string) {
		this.setText(this._description, value);
	}
    
    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set price(value: string) {
        this.setDisabled(this._button, !value);
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
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

    set button(value: string) {
        this.setText(this._button, value);
    }
    
    changeButton(value: string) {
        this.setText(this._button, value);
    }
    
    disablePreviewCard() {
        this.setDisabled(this._button, true);
    }
    
    set index(value: string) {
        this._basketIndex.textContent = value;
    }
}

export class BasketCard extends Component <IProduct> {
    protected _basketIndex: HTMLElement;
    protected _title: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _price: HTMLElement;
    
    constructor (container: HTMLElement, actions?: IProductActions){
        super(container);
        this._basketIndex = this.container.querySelector('.basket__item-index');
        this._title = this.container.querySelector('.card__title');
        this._button = this.container.querySelector('.basket__item-delete');
        this._price = this.container.querySelector('.card__price');

        if(this._button) {
            this._button.addEventListener('click', (evt) => {
                this.container.remove();
                actions?.onClick(evt);
            })
        }
    }

    set index(value: number) {
		this.setText(this._basketIndex, `${value}`);
	}

    set title(value: string) {
        this.setText(this._title, value);  
    }

    set price(value: number) {   
        this.setText(this._price, `${value}` + ' синапсов');
    }
}