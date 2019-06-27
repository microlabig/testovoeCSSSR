# Тестовое задание от CSSSR (by Igor Bezmestin)

Резюме - [http://igorbezmestin.ru](http://igorbezmestin.ru)

Почта - [igor-rock@list.ru](mailto://igor-rock@list.ru), [igorbezmestin@gmail.com](mailto://igorbezmestin@gmail.com)

VK - [vk.com/igorbezmestin](https://vk.com/igorbezmestin)

Телеграмм - [@BezmestinIY](https://t.me/BezmestinIY)

---

## Запуск проекта

``` bash
# установить зависимости
npm i

# запуск сервера в режиме dev (разработки) (по-умолчанию, сервер расположен по адресу localhost:8080)
npm run dev

# билд проекта
npm run build

```

Для просмотра итогового проекта перейдите по ссылке [http://testCSSSR.igorbezmestin.ru](http://testCSSSR.igorbezmestin.ru)

## Структура папок и файлов

```
├── dist/                         # Билд проекта
├── app/                          # Исходники
│   ├── fonts/                    # Используемые шрифты (OpenSans)
│   ├── scripts/                  # Часто используемые вспомогательные функции
│   │   ├── historyItems.js       # Преобразование даты звонков TODO:
│   │   └── urls.js               # URL изображений (по-умолчанию) TODO:
│   ├── images/                   # Папка для хранения изображений
│   │   └── icons/                # SVG-иконки
│   ├── styles/                   # Стили (PostCSS)
│   │   ├── blocks/               # Стили отдельных компонентов
│   │   ├── layout/               # Базовые стили проекта
│   │   └── main.pcss             # Файл порядка подключения стилей
│   ├── App.vue                   # Основной компонент Vue TODO:
│   ├── index.pug                 # Основной файл верстки
│   └── main.js                   # Основной файл подключаемых модулей и настройки проекта
├── .browserslist                 # Список версий браузеров для Autoprefixer 
├── .gitignore                    # Список исключённых файлов (из Git)
├── package.json                  # Список зависимостей и прочей информации проекта
├── README.md                     # Документация проекта
└── gulp.config.js                # Конфигурация Gulp

```

## Основной используемый стек

* Gulp
* SASS + normalize.css
* PUG
* npm
