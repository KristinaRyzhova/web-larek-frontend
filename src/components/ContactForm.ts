import { IOrder } from "../types";
import { Form } from "./Form";
import { IEvents } from "./base/Events";

export class ContactsForm extends Form<IOrder> {

    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._email = container.querySelector('input[name="email"]') as HTMLInputElement;
        this._phone = container.querySelector('input[name="email"]') as HTMLInputElement;
    }

    set phone(value: string) {
        this._email.value = value;
    }

    set email(value: string) {
        this._email.value = value;
    }
}