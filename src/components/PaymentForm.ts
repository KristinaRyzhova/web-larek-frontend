import { Form } from "./Form";
import { IOrder } from "../types"; 
import { IEvents } from "./base/Events";

export class PaymentForm extends Form<IOrder> {

    protected _buttons: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container, events);
        this._buttons = Array.from (container.querySelectorAll('.button_alt'));
        this._address = this.container.elements.namedItem('address') as HTMLInputElement

        this._buttons.forEach((element) =>
            element.addEventListener('click', (event: MouseEvent) => {
                const target = event.target as HTMLButtonElement;
                const name = target.name;
                this.setButtonClass(name);
                events.emit('payment:changed', { target: name });
            })
        );
    }
  
    setButtonClass(name: string): void {
        this._buttons.forEach((button) => {
            this.toggleClass(button, 'button_alt-active', button.name === name);
        });
    }
  
    set address(value: string) {
        this._address.value = value;
    }
}