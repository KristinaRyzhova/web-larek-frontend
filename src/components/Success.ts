import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

import { ISuccess } from '../types';

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccess, total: number) {
		super(container);

		this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
		this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
		this.setText(this._total, `Списано ${total} синапсов`);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}
}