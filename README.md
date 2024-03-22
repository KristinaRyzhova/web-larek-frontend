# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

____
Архитектура приложения:
_____


Описание типов и интерфейсов:
____

export type IPayment = 'Онлайн' | 'При получении';
export type ICategoryItem = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';

export interface IProductCard {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: ICategoryItem;
}

export interface ICatalogItems {
    items: IProductCard[];
    setItems(items: IProductCard[]): void;
    getProduct(id: string): void;
}

export interface IBasket {
    counter: number;
    items: IProductCard[] | null;
    total: number | null;
    add(id: string): void;
    remove(id: string): void;
}

export interface IOrderForm {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProductCard[] | null;
    total?: number | null;
}

export interface IOrder extends IOrderForm {
    items: IProductCard[] | null;
}

export interface IModal {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProductCard[] | null;
    total?: number | null;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IPaymentForm extends IModal {
    payment: IPayment;
    address: string;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IContactsForm extends IModal {
    email: string;
    phone: string;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface ISuccessForm extends IModal {
    total: number;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

export interface IFormErrors {
    validity: boolean;
    errors: string[];
}

_______
Базовый код:
______
1.	Model: 
 •	Класс ProductCard служит для отрисовки карточки товара на странице.
 •	Класс CatalogItems содержит свойство items – массив товаров в каталоге, метод setItems добавляющий список всех товаров каталоге на страницу каталога, метод getProduct отображающий полную информацию по карточке каждого товара.
 •	Класс Basket отрисовывает элементы в корзине. Содержит: 
  - counter – подсчет количества товаров в корзине;
  - items – массив товаров в корзине;
  - total – сумму цен товаров в корзине;
  - add() – метод добавляющий товары в корзину;
  - remove() – метод убирающий товары из корзины; 
2.	View:
 •	Класс Modal служит для отрисовки модальных окон.
Метод open служит для открытия модального окна по клику.
Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.
Класс PaymentForm реализует отрисовку модального окна с вариантами оплаты и адресом пользователя. Содержит кнопки метода оплаты ‘Онлайн’ и ‘При получении’, кнопку закрытия модального окна и кнопку submit, направляющую пользователя на страницу оплаты.
Метод open служит для открытия модального окна по клику.
Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.
Класс ContactsForm реализует отрисовку модального окна с контактами пользователя. Содержит поля: email и phone, кнопку закрытия модального окна и кнопку submit, закрывающую данное модальное окно и направляющую пользователя на страницу оплаты корзины. 
Метод open служит для открытия модального окна по клику.
Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.
 Класс SuccessForm реализует отрисовку модального окна при успешном создании заказа. Содержит итоговую сумму всех заказанных товаров, кнопку закрытия модального окна и кнопку submit, закрывающую данное модальное окно и направляющую пользователя в каталог товаров. 
Метод open служит для открытия модального окна по клику.
Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.
 •	Класс FormErrors реализует валидацию инпутов форм.
3.	Presenter:
 •	Класс API взаимодействует с сервером посредством запросов к серверу. В данном приложении для получения и отправки данных мы будем использовать запросы: GET, POST. 
 •	Класс EventEmitter реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события. Класс имеет методы on, off, emit – для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно. Дополнительно реализованы методы onAll и offAll - для подписки на все события и сброса всех подписчиков. Метод trigger, генерирует заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter.
