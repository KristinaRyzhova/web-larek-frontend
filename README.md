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

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения и вычисления между этой передачей, а также они меняют значения в моделях.

Для разработки архитектуры проекта применялся архитектурный шаблон MVP (Model-View-Presenter). MVP разделяет приложение на три основных компонента:

Слой данных (Model) — данные между сервером и интерфейсом, в которых отражена бизнес-логика приложения. Данный слой ответственен за выполнение таких операций как чтение и запись данных, обработка бизнес-логики и взаимодействие с базами данных или внешними источниками данных.

Слой представления (Presenter) — в данном приложении взаимодействие с сервером посредством API и класса EventEmitter.

Слой отображения (View) — интерфейс для взаимодействия с пользователем. Данный слой отображает данные пользователя, обрабатывает события с действиями пользователя.

____

## Базовый код

____

### Класс API

Класс API взаимодействует с сервером посредством запросов к серверу. В данном приложении для получения и отправки данных мы будем использовать запросы: GET, POST.

В конструктор класса API передается:

- baseUrl: string - базовый URL для всех запросов;
- options: RequestInit = {} - объект с заголовками запросов.

Методы класса API:

- protected handleResponse - защищенный метод, который обрабатывает ответ от сервера.
- get - отправляет GET-запрос на сервер.
- post - отправляет POST-запрос на сервер.

### Класс larekApi

Класс LarekApi - взаимодействуя с сервером, предоставляет данные о товарах в каталоге приложения:

Поле класса: readonly cdn: string;

В конструктор класса LarekApi передается:

- cdn: string - URL для CDN;
- baseUrl: string - базовый URL для всех запросов;
- options?: RequestInit = {} - объект с заголовками запросов, опционально.

Методы класса LarekApi:

- getProductItem - получает информацию по конкретному продукту по его id;
- getProductItems - получает данные всех продуктов;
- orderProduct(order: IOrder) - отправляет данные заказа.

### Класс EventEmitter

Класс EventEmitter реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

В конструктор класса EventEmitter передается:

- _events - коллекция с именами событий и функциями подписчиками на события.

Методы класса EventEmitter:

- on - метод устанавливающий обработчик на событие;
- off - метод снимающий обработчик с события;
- emit - метод уведомляющий подписчиков о наступлении события;
- onAll - метод устанавливающий обработчик на все события;
- offAll - метод сбрасывает все обработчики;
- trigger - метод, генерирующий заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса  EventEmitter.

### Класс Component

Абстрактный базовый класс, предназначен для работы с DOM в дочерних компонентах.

Класс является дженериком и принимает в переменной T тип данных компонента.

В конструктор класса ```Component<T>``` передается элемент контейнера типа HTMLElement, в который будет помещен компонент.

Методы класса ```Component<T>```:

- toggleClass - переключает класс элемента;
- setText - устанавливает текстовое содержимое элемента;
- setDisabled - меняет статус блокировки элемента;
- protected setHidden - защищенный метод, скрывает переданный элемент;
- protected setVisible - защищенный метод, отображает переданный элемент;
- protected setImage - защищенный метод, устанавливает изображение и альтернативный текст для изображения;
- render - рендерит и возвращает корневой DOM-элемент.

### Класс Model

Класс Model - абстрактный базовый класс, предназначен, чтобы можно было отличить базовую модель от простых объектов с данными.

Класс является дженериком и принимает в переменной T тип данных которые будет содержать базовая модель.

В конструктор класса приходят:

- data: ```Partial<T>``` - данные, принимают любое количество свойств типа T;
- protected events: IEvents - защищенный объект с типом IEvents.

Методы класса:

- emitChanges(event: string, payload?: object) - сообщает всем что модель поменялась.

____

## Компоненты модели данных (бизнес-логика)

### Класс AppState

Класс AppState управляет состоянием работы приложения.
Класс является дженериком, расширяет класс Model и принимает в переменной интерфейс IAppState.

Поля класса:

- catalog - каталог товаров.
- basket - массив товаров в корзине.
- order - данные о заказе.
- preview - предварительный просмотр карточки товара.
- formErrors - ошибки в инпутах форм.

Методы класса:

- setCatalog - метод для загрузки списка всех товаров с сервера;
- setPreview - метод для предпросмотра товара;
- isInBasket - метод для проверки статуса товара находится он в корзине или нет;
- getBasketItems - метод представляющий корзину с выбранными товарами.
- addToBasket - метод добавляющий товар в корзину;
- removeFromBasket - метод удаляющий товар из корзины;
- getTotal - метод для подсчета полной стоимости заказа;
- setPaymentMethod - метод выбора способов оплаты.
- setPaymentAddress - метод устанавливающий значение в поле адреса.
- setContactField - метод установки значений полей с данными покупателя.
- validatePaymentForm - метод проверки правильности введенных данных в форме с оплатой и адресом.
- validateContactForm - метод проверки правильности введенных данных покупателя.
- setOrder - метод установки данных заказа с выбранными товарами и общей суммой покупки.
- clearOrder - метод для очистки данных заказа.
- clearBasket - метод для очистки корзины.

____

## Компоненты представления

### Класс Page

Класс Page служит для отрисовки главной страницы приложения.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IPage.

Поля класса:

- _counter - счетчик товаров в корзине;
- _catalog - каталог товаров;
- _wrapper - обертка главной страницы;
- _basket - элемент корзины.

Конструктор класса:
    constructor(container: HTMLElement, protected events: IEvents) - принимает контейнер, содержащий все элементы главной страницы и объект событий.

Методы класса:

- set counter - устанавливает счетчик товаров в корзине;
- set catalog - загружает каталог товаров на главную страницу;
- set locked - устанавливает блокировку от прокрутки при активном модальном окне.

### Класс Card

Класс Card служит для отрисовки карточки товара на странице.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IProduct.

Поля класса:

- _title - наименование товара;
- _description - описание товара;
- _image - изображение товара;
- _price - стоимость товара;
- _category - категория товара;
- _button - устанавливает текс кнопки, в зависимости в корзине товар или нет;
- _basketIndex - номер товара в корзине.

Конструктор класса:
    constructor(container: HTMLElement, actions?: IProductActions) - контейнер с элементом блока и действия с элементом (опционально).

Методы класса Card:

- set id - установить идентификатор карточки товара;
- set title - установить наименование товара;
- set description - установить описание товара;
- set image - установить изображение товара;
- set price - установить стоимость товара;
- set category - установить категорию товара;
- set button - установить текст кнопки;
- changeButton - метод изменяющий текст кнопки;
- disablePreviewCard - метод делающий кнопку не активной;
- set index - метод установки номера товара в корзине;

### Класс BasketCard

Класс BasketCard служит для отрисовки карточки товара на странице.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IProduct.

Поля класса:

- _basketIndex - номер товара в корзине.
- _title - наименование товара;
- _button - устанавливает кнопку удаления товара из корзины;
- _price - стоимость товара;

Конструктор класса:
    constructor(container: HTMLElement, actions?: IProductActions) - принимает контейнер с элементом блока и действия с элементом (опционально).

Методы класса BasketCard:

- set index - установить индекс карточки товара в корзине;
- set title - установить наименование товара;
- set price - установить стоимость товара;

### Класс Modal

Класс Modal служит для отрисовки модальных окон.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IModal.

Поля класса:

- protected _closeButton - кнопка закрытия модального окна;
- protected _content - содержимое модального окна;

Конструктор класса:
    constructor(container: HTMLElement, protected events: IEvents) - принимает элемент контейнера модального окна и объект событий.

Методы класса Modal:

- set content - устанавливает контент модального окна;
- _toggleModal - переключает состояние модального окна "модальное окно открыто"/"модальное окно закрыто".
- _handleEscape - закрытие модального окна по нажатию кнопки Escape.
- open - открытие модального окна;
- close - закрытие модального окна по нажатию кнопки закрытия;
- render - рендерит элемент модального окна;

### Класс Basket

Класс Basket отрисовывает элементы в корзине.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IBasketView.

Поля класса:

- protected _list - защищенное поле, список товаров в корзине;
- protected _total - защищенное поле, общая стоимость товаров в корзине;
- protected _button - защищенное поле, кнопка оформления заказа;

Конструктор класса:
    constructor(container: HTMLElement, protected events: EventEmitter) - принимает элемент контейнера корзины и объект событий.

Методы класса Basket:

- set items - устанавливает массив товаров в корзине или отрисовывает сообщение, что корзина пуста;
- set total - устанавливает общую стоимость товаров в корзине.
- removeAllItemsFromBasket - метод для очистки содержимого корзины меняющий выбранные товары на строку "Корзина пуста" и делающий кнопку неактивной.

### Класс Form

Класс Form служит для создания и управления элементами формы.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IFormState.

Поля класса:

- protected _submit - защищенное поле, кнопка для отправки данных введенных в инпуты формы;
- protected _errors - отображает ошибки валидации.

Конструктор класса:
    constructor(protected container: HTMLFormElement, protected events: IEvents) - принимает защищенный элемент контейнера корзины и защищенный объект событий.

Методы класса Form:

- protected onInputChange - защищенный метод изменения значений инпутов формы;
- set valid - устанавливает состояние валидности введенной информации в инпуты;
- set errors - устанавливает текст ошибок валидации;
- render - рендерит элемент формы.

### Класс PaymentForm

Класс PaymentForm отрисовывает окно с формой, содержащей способ оплаты и адрес пользователя, является дженериком, расширяет класс Form и принимает в переменной интерфейс IOrder.

Поля класса:

- protected _buttons - защищенное поле, кнопка выбора варианта оплаты;
- protected _address - защищенное поле формы с адресом заказчика.

Конструктор класса:
    constructor(container: HTMLFormElement, events: IEvents) - принимает элемент контейнера и объект событий.

Методы класса PaymentForm:

- set setButtonClass - установка варианта оплаты;
- set address - устанавливает электронную почту пользователя.

### Класс ContactForm

Класс ContactForm отрисовывает окно с данными пользователя (телефон и e-mail), является дженериком, расширяет класс Form и принимает в переменной интерфейс IOrder.

Поля класса:

- protected _email - защищенное поле формы с электронным адресом заказчика;
- protected _phone - защищенное поле формы с телефоном заказчика.

Конструктор класса:
    constructor(container: HTMLFormElement, events: IEvents) - принимает элемент контейнера и объект событий.

Методы класса ContactForm:

- set phone - устанавливает в телефон пользователя;
- set email - устанавливает электронную почту пользователя.

### Класс Success

Класс SuccessForm расширяет класс Component и принимает в переменной интерфейс ISuccess. Класс реализует отрисовку модального окна при успешном создании заказа. Содержит итоговую сумму всех заказанных товаров, кнопку закрытия модального окна и кнопку, закрывающую данное модальное окно и направляющую пользователя в каталог товаров.

Поля класса:

- protected _close - защищенное поле, элемент закрывающий модальное окно;
- protected _total - защищенное поле, общая сумма заказа;

Конструктор класса:
    constructor(container: HTMLElement, actions: ISuccessActions) - принимает элемент контейнера и объект событий.

____

## Ключевые интерфейсы и типы данных

____

**Интерфейс ILarekApi** - интерфейс определяет два метода – getProductItems и getProductItem, которые должны взаимодействовать с API.

```text
export interface ILarekApi {
    getProductItems: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
}
```

**Интерфейс IProductActions** - интерфейс используется для обработки события нажатия на элемент продукта.

```text
export interface IProductActions {
    onClick: (event: MouseEvent) => void;
}
```

**Интерфейс IProduct** - интерфейс содержащий данные карточки товара.

```text
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
```

**Интерфейс IPage** - интерфейс отображения главной страницы приложения.

```text
export interface IPage {
    wrapper: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    basket: HTMLElement;
    locked: boolean;
}
```

**Интерфейс IBasket** - интерфейс описывающий данные корзины.

```text
export interface IBasket {
    items: HTMLElement[];
    total: number;
    selected: string[];
    list: HTMLElement;
    button: HTMLElement;
}
```

**Интерфейс IBasketProduct** - интерфейс определяет набор свойств, связанных с продуктами в корзине.

```text
export interface IBasketProduct {
    index: number;
    title: string;
    price: number;
    button: string;
}
```

**Интерфейс IPaymentForm** - интерфейс определяет набор свойств, связанных с формой выбора способа оплаты и адреса доставки.

```text
export interface IPaymentForm {
    payment?: string;
    address?: string;
}
```

**Интерфейс IContactForm** - интерфейс определяет набор свойств, связанных с формой данных покупателя.

```text
export interface IContactForm {
    email: string;
    phone: string;
}
```

**Интерфейс IOrder** - интерфейс содержащий данные и методы модального окна с данными пользователя для заказа товаров.

```text
export interface IOrder extends IPaymentForm, IContactForm {
    items: string[];
    total: number;
}
```

**Интерфейс IOrderResult** - интерфейс определяет набор свойств, связанных с результатом заказа.

```text
export interface IOrderResult {
    id: string;
    total: number;
}
```

**Интерфейс ISuccess** - интерфейс содержащий данные и методы модального окна при успешном оформлении заказа.

```text
export interface ISuccess {
    total?: number;
    onClick?: () => void;
}
```

**Интерфейс IAppState** - интерфейс содержащий данные и методы для управления состоянием проекта.

```text
export interface IAppState {
    list: IProduct[];
    basket?: IProduct[];
    preview?: string | null;
    order?: IOrder | null;
    total: string | number;
}
```

**Тип проверки валидности инпутов форм модальных окон - FormErrors:**

```text
export type FormErrors = Partial<Record<keyof IOrder, string>>;
```

**Тип способа оплаты:**

```text
export type TPayment = 'Онлайн' | 'При получении';
```