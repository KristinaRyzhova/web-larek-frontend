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

### Класс EventEmitter

Класс EventEmitter реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.

В конструктор класса EventEmitter передается:

- _events - коллекция с именами событий и функцииями подписчиками на события.

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
- protected setImage - защищенный метод, устанавливает изображение и альтернативный текст для изоображения;
- render - рендерит и возвращает корневой DOM-элемент.

### Класс Model

Класс Model - абстрактный базовый класс, предназначен, чтобы можно было отличить базовую модель от простых объектов с данными.

Класс является дженериком и принимает в переменной T тип данных которые будет содержать базовая модель.

В конструктор класса приходят:

- data: ```Partial<T>``` - данные, принимают любое количество свойств типа T;
- protected events: IEvents - защищеный объект с типом IEvents.

Методы класса:

- emitChanges(event: string, payload?: object) - сообщает всем что модель поменялась.

____

## Компоненты модели данных (бизнес-логика)

### Класс AppState

Класс AppState управляет состоянием работы приложения.
Класс является дженериком, расширяет класс Model и принимает в переменной интерфейс IAppState.

Поля класса:

- basket - массив товаров в корзине.
- catalog - каталог товаров.
- order - данные о заказе.
- formErrors - ошибки в инпутах форм.

Методы класса:

- toggleOrderedItem - метод для проверки статуса товара находится он в корзине или нет;
- setCatalog - метод для загрузки списка всех товаров с сервера;
- clearBasket - метод для очистки корзины;
- setPreview - метод для предпросмотра товара;
- getTotal - метод для подсчета полной стоимости заказа;
- addItemBasket - метод обавляющий товар в корзину;
- removeItemBasket - метод удаляющий товар из корзины;
- validateOrder - метод проверки правильности введенных данных.

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
- set catalog - загружает каталог воваров на главную страницу;
- set locked - устанавливает блокировку от прокрутки при активном модальном окне.

### Класс Card

Класс Card служит для отрисовки карточки товара на странице.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс ICard.

Поля класса:

- _id - идентификтор товара;
- _title - наименование товара;
- _description - описание товара;
- _image - изображение товара;
- _category - категория товара;
- _button - устанавливает текс кнопки, в зависимости в корзине товар или нет;
- _price - стоимость товара;
- _index - номер товара в корзине.

Конструктор класса:
    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) - принимает наименование блока, контейнер с элементом блока и действия с элементом (опционально).

Методы класса Card:

- get id/set id - получить/установить идентификатор карточки товара;
- get title/set title - получить/установить наименование товара;
- get description/set description - получить/установить описание товара;
- get image/set image - получить/установить изображение товара;
- get category/set category - получить/установить категорию товара;
- get price/set price - получить/установить стоимость товара;
- get button/set button - получить/установить текст кнопки;
- get index/set index - номер товара в корзине;

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
- open - открытие модального окна;
- close - закрытие модального окна по нажатию кнопки закрытия;
- handleEscClose - закрывает модальное окно по нажатию клавиши Esc.
- render - рендерит элемент модального окна;

### Класс Basket

Класс Basket отрисовывает элементы в корзине.
Класс является дженериком, расширяет класс Component и принимает в переменной интерфейс IBasket.

Поля класса:

- protected _list - защищенное поле, список товаров в корзине;
- protected _total - защищенное поле, общая стоимость товаров в корзине;
- protected _button - защищенное поле, кнопка оформления заказа;

Конструктор класса:
    constructor(container: HTMLElement, protected events: EventEmitter) - принимает элемент контейнера корзины и объект событий.

Методы класса Basket:

- set items - устанавливает массив товаров в корзине или отрисовывает сообщение, что корзина пуста;
- set selected - в зависимости от наличия товаров в корзине, делает кнопку оформления заказа активной или нет;
- set total - устанавливает общую стоимость товаров в корзине.

### Класс Form

Класс Form служит для создания и управления элементами формамы.
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

Класс PaymentForm отрисовывает окно с формой содержащей способ оплаты и адрес пользователя, является дженериком, расширяет класс Form и принимает в переменной интерфейс IOrder.

Конструктор класса:
    constructor(container: HTMLFormElement, events: IEvents) - принимает элемент контейнера и объект событий.

Методы класса PaymentForm:

- set payment - установка варианта оплаты;
- set address - устанавливает электронную почту пользователя.

### Класс ContactForm

Класс ContactForm отрисовывает окно с данными пользователя (телефон и e-mail), является дженериком, расширяет класс Form и принимает в переменной интерфейс IOrder.

Конструктор класса:
    constructor(container: HTMLFormElement, events: IEvents) - принимает элемент контейнера и объект событий.

Методы класса ContactForm:

- set phone - устанавливает в телефон пользователя;
- set email - устанавливает электронную почту пользователя.

### Класс Success

Класс SuccessForm расширяет класс Component и принимает в переменной интерфейс ISuccess. Класс реализует отрисовку модального окна при успешном создании заказа. Содержит итоговую сумму всех заказанных товаров, кнопку закрытия модального окна и кнопку, закрывающую данное модальное окно и направляющую пользователя в каталог товаров.

Поля класса:

- protected _close - защищенное поле, элемент закрывающий модальное окно;

Конструктор класса:
    constructor(container: HTMLElement, actions: ISuccessActions) - принимает элемент контейнера и объект событий.

Методы конструктора класса SuccessForm:

- _close - при клике на кнопку идет закрытие окна.

____

## Ключевые интерфейсы и типы данных

____

**Интерфейс ICard** - интерфейс содержащий данные карточки товара:

```text
export interface ICard {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number | null;
    category?: ICategory;
}
```

**Интерфейс IPage** - интерфейс отображения главной страницы приложения.

```text
export interface IPage {
    wrapper: HTMLElement;
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
```

**Интерфейс IModal** - интерфейс содержащий данные и методы модальных окон:

```text
export interface IModal {
    payment?: IPayment;
    address?: string;
    email?: string;
    phone?: string;
    items?: ICard[] | null;
    total?: number | null;
    open(): void;
    close(): void;
    handleEscClose(): void;
}
```

**Интерфейс IBasket** - интерфейс описывающий данные корзины:

```text
export interface IBasket {
    items: HTMLElement[];
    total: number;
    selected: string[];
    list: HTMLElement;
    button: HTMLElement;
}
```

**Интерфейс IOrder** - интерфейс содержащий данные и методы модального окна с данными пользователя для заказа товаров:

```text
export interface IOrder  {
    payment: IPayment; 
    address: string;
    email: string;
    phone: string;
}
```

**Интерфейс ISuccess** - интерфейс содержащий данные и методы модального окна при успешном оформлении заказа:

```text
export interface ISuccess {
    total: number;
    onClick: () => void;
}
```

**Интерфейс IAppState** - интерфейс содержащий данные и методы для управления состоянием проекта:

```text
export interface IAppState {
    catalog: ICard[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}
```

**Тип проверки валидности инпутов форм модальных окон - FormErrors:**

```text
export type FormErrors = Partial<Record<keyof IModal, string>>;
```

**Тип способа оплаты:**

```text
export type IPayment = 'Онлайн' | 'При получении';
```

**Тип выбранной категории товаров:**

```text
export type ICategory = 
    'софт-скил' | 
    'хард-скил' | 
    'кнопка' | 
    'другое' | 
    'дополнительное';
```
