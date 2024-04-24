export interface IProductActions {
    onClick: (event: MouseEvent) => void;
}

export interface IProduct {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: string;
    button: string;
    index?: number;
}

export interface IPage {
    wrapper: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    basket: HTMLElement;
    locked: boolean;
}

export interface IModal {
    payment?: TPayment;
    address?: string;
    email?: string;
    phone?: string;
    total?: number | null;
    open(): void;
    close(): void;
    render(): void;
}

export interface IBasketProduct {
    index: number;
    title: string;
    price: number;
    button: string;
}

export interface IOrder  {
    payment: TPayment; 
    address: string;
    email: string;
    phone: string;
}

export interface ISuccess {
    total: number;
    onClick: () => void;
}

export interface IAppState {
    list: IProduct[];
    basket?: IProduct[];
    preview?: string | null;
    order?: IOrder | null;
    total: string | number;
}

export type FormErrors = Partial<Record<keyof IModal, string>>;
export type TPayment = 'Онлайн' | 'При получении';