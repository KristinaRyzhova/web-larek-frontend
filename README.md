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
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```text
npm install
npm run start
```

или

```text
yarn
yarn start
```

## Сборка

```text
npm run build
```

или

```text
yarn build
```

____

## Архитектура приложения

### Об архитектуре

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

____

## Базовый код

____
**1. Model:**

**Класс ProductCard** служит для отрисовки карточки товара на странице.

**Класс CatalogItems** содержит свойство items – массив товаров в каталоге, метод setItems добавляющий список всех товаров каталоге на страницу каталога, метод getProduct отображающий полную информацию по карточке каждого товара.

**2. View:**

**Класс Modal** служит для отрисовки модальных окон.

- Метод open служит для открытия модального окна по клику.
- Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.

**Класс Basket** отрисовывает элементы в корзине. Содержит:

- counter – подсчет количества товаров в корзине;
- items – массив товаров в корзине;
- total – сумму цен товаров в корзине;
- add() – метод добавляющий товары в корзину;
- remove() – метод убирающий товары из корзины;

**Класс Form**

**Класс PaymentForm** реализует отрисовку модального окна с вариантами оплаты и адресом пользователя. Содержит кнопки метода оплаты ‘Онлайн’ и ‘При получении’, кнопку закрытия модального окна и кнопку submit, направляющую пользователя на страницу оплаты.

- Метод open служит для открытия модального окна по клику.
- Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.

**Класс ContactsForm** реализует отрисовку модального окна с контактами пользователя. Содержит поля: email и phone, кнопку закрытия модального окна и кнопку submit, закрывающую данное модальное окно и направляющую пользователя на страницу оплаты корзины.

- Метод open служит для открытия модального окна по клику.
- Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.

**Класс SuccessForm** реализует отрисовку модального окна при успешном создании заказа. Содержит итоговую сумму всех заказанных товаров, кнопку закрытия модального окна и кнопку submit, закрывающую данное модальное окно и направляющую пользователя в каталог товаров.

- Метод open служит для открытия модального окна по клику.
- Метод close служит для закрытия модального окна по клику. Метод handleEscClose закрывает модальное окно по нажатию клавиши Esc.

**Класс FormErrors** реализует валидацию инпутов форм.






**3. Presenter:**

**Класс API** взаимодействует с сервером посредством запросов к серверу. В данном приложении для получения и отправки данных мы будем использовать запросы: GET, POST.

В конструктор класса API передается:

- baseUrl: string - базовый URL для всех запросов;
- options: RequestInit = {} - объект с заголовками запросов.

Методы класса API:

- protected handleResponse - защищенный метод, который обрабатывает ответ от сервера.
- get - отправляет GET-запрос на сервер.
- post - отправляет POST-запрос на сервер.

**Класс EventEmitter** реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

В конструктор класса EventEmitter передается:

- _events - коллекция с именами событий и функцииями подписчиками на события.

Методы класса EventEmitter:

- on - метод устанавливающий обработчик на событие;
- off - метод снимающий обработчик с события;
- emit - метод уведомляющий подписчиков о наступлении события;
- onAll - метод устанавливающий обработчик на все события;
- offAll - метод сбрасывает все обработчики;
- trigger - метод, генерирующий заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса  EventEmitter.

____

### Описание типов и интерфейсов

____

```text
*** Интервейс IProductCard *** - интерфейс содержащий данные карточки товара:
export interface IProductCard {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: ICategoryItem;
}

*** Интервейс ICatalogItems*** - интерфейс каталога карточек товаров:
export interface ICatalogItems {
    items: IProductCard[];
    setItems(items: IProductCard[]): void;
    getProduct(id: string): void;
}

*** Интервейс IBasket *** - интерфейс описывающий данные корзины:
export interface IBasket {
    counter: number;
    items: IProductCard[] | null;
    total: number | null;
    add(id: string): void;
    remove(id: string): void;
}

*** Интервейс IOrderForm *** - интерфейс содержащий данные заказа:
export interface IOrderForm {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: IProductCard[] | null;
    total?: number | null;
}

*** Интервейс *** - интерфейс содержащий :
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

*** Интервейс *** - :
export interface IPaymentForm extends IModal {
    payment: IPayment;
    address: string;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

*** Интервейс *** - :
export interface IContactsForm extends IModal {
    email: string;
    phone: string;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

*** Интервейс *** - :
export interface ISuccessForm extends IModal {
    id: string;
    total: number;
    open(): void;
    close(): void;
    handleEscClose(): void;
}

*** Интервейс IFormErrors*** - :
export interface IFormErrors {
    validity: boolean;
    errors: string[];
}

***Тип способа оплаты:***
export type IPayment = 'Онлайн' | 'При получении';

***Тип выбранной категории товаров:***
export type ICategoryItem = 'софт-скил' | 'хард-скил' | 'кнопка' | 'другое' | 'дополнительное';
```
