# Тестовое задание от CSSSR (by Igor Bezmestin)

Мой сайт - [http://igorbezmestin.ru](http://igorbezmestin.ru)

Почта - [igor-rock@list.ru](mailto://igor-rock@list.ru), [igorbezmestin@gmail.com](mailto://igorbezmestin@gmail.com)

VK - [vk.com/igorbezmestin](https://vk.com/igorbezmestin)

Телеграмм - [@BezmestinIY](https://t.me/BezmestinIY)

---

## Запуск проекта

``` bash
# установить зависимости
yarn install

# запуск сервера в режиме dev (разработки) (по-умолчанию, сервер расположен по адресу localhost:3000)
yarn gulp

# билд проекта
yarn build

``` 

Для просмотра итогового проекта перейдите по ссылке [http://testCSSSR.igorbezmestin.ru](http://testCSSSR.igorbezmestin.ru)

## Структура папок и файлов

```
├── dist/                         # Билд проекта
├── app/                          # Исходники
│   ├── fonts/                    # Используемые шрифты (OpenSans)
│   ├── scripts/                  # Часто используемые вспомогательные функции
│   │   ├── checkbox.js           # Обработка нажатий на checkbox (для A11y)
│   │   ├── radiobutton.js        # Обработка нажатий на radiobutton (для A11y)
│   │   ├── slider.js             # Реализация слайдера
│   │   └── textarea.js           # Скрипт автоматического добавления строк в textarea
│   ├── images/                   # Папка для хранения изображений│   │   
│   ├── styles/                   # Стили (SASS)
│   │   ├── blocks/               # Стили отдельных компонентов
│   │   ├── layout/               # Базовые стили проекта
│   │   └── main.pcss             # Основной файл порядка подключения стилей
│   └── pages                     # Папка с pug-файлами (разметка)
│       ├── mixins/               # Используемые pug-миксины
│       │   ├── parts/            # Отдельные компоненты
│       │   │   └── slider.pug    # Миксин слайдера
│       │   ├── sections/         # Миксин отдельных секций
│       │   └── entry.pug         # Файл подключения миксинов
│       └── index.pug             # Основной файл разметки страницы
├── .browserslist                 # Список версий браузеров для Autoprefixer 
├── .gitignore                    # Список исключённых файлов (из Git)
├── package.json                  # Список зависимостей и прочей информации проекта
├── README.md                     # Документация проекта
├── gulpfile.js                   # Конфигурация Gulp
└── gulp.config.js                # Основные константы для Gulp

```

## Основной используемый стек

* Gulp
* SASS + normalize.css
* PUG
* npm, yarn
