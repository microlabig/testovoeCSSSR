// импортируем gulp
const {src, dest, task, series, watch, parallel} = require('gulp');
// импортируем плагины
const   rm = require('gulp-rm'),    // удаление файлов
        sass = require('gulp-sass'), // SASS
        concat = require('gulp-concat'), // соединение файлов в один
        browserSync = require('browser-sync').create(), // dev-Server
        reload = browserSync.reload, // функция перезагрузки dev-Server
        sassGlob = require('gulp-sass-glob'), // продвинутый импорт стилей
        autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
        px2rem = require('gulp-smile-px2rem'), // перевод из px в rem
        gcmq = require('gulp-group-css-media-queries'), // группировка одинаковых медиазапросов  
        cleanCSS = require('gulp-clean-css'), // минификация css
        sourcemaps = require('gulp-sourcemaps'), // source maps
        babel = require('gulp-babel'), // ES 6 -> браузеросовместимый код
        uglify = require('gulp-uglify'), // минификация js
        svgo = require('gulp-svgo'), // оптимизация svg
        svgSprite = require('gulp-svg-sprite'), // объединения всех svg в один
        gulpif = require('gulp-if'); // плагин условия

const env = process.env.NODE_ENV; // env - переменная из переменных окружения node.js, определяется в package.json

// импортируем настройки из gulp.config.js
const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

// укажем компилятор для SASS
sass.compiler = require('node-sass');

// таск очистки
task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

// таск копирования HTML
task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(`${DIST_PATH}`))
        .pipe(reload({stream: true}));
});

// таск стилей
task('styles', () => {
  return src([...STYLES_LIBS,`${SRC_PATH}/styles/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem())
        .pipe(gulpif(env === 'dev', autoprefixer({ cascade: false })))
        .pipe(gulpif(env === 'build', gcmq()))
        .pipe(gulpif(env === 'build', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream: true}));
});

// таск скриптов
task('scripts', () => {
    return src([...JS_LIBS,`${SRC_PATH}/scripts/**/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ";"}))
    .pipe(gulpif(env === 'build', babel({ presets: ['@babel/env'] })))
    .pipe(gulpif(env === 'build', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream: true}));
});

// таск иконок
task('icons', () => {
    return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(svgo({
        plugins: [
            {
                removeAttr: {
                    attrs: "(fill|stroke|style|width|height|data.*)"
                }
            }
        ]
    }))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg"
            }
        }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`))
});

// таск дев-сервера
task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

// вотчеры
task('watch', ()=> {
    watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
    watch(`./${SRC_PATH}/scripts/**/*.js`, series('scripts'));
    watch(`./${SRC_PATH}/*.html`, series('copy:html'));
    watch(`./${SRC_PATH}/images/icons/**/*.svg`, series('icons'));
})

// таск по умолчанию
task('default', 
    series('clean', 
            parallel('copy:html', 'styles', 'scripts', 'icons'), 
            parallel('watch', 'server')
    )
);

// таск build
task('build', 
    series('clean', 
            parallel('copy:html', 'styles', 'scripts', 'icons')
    )
);