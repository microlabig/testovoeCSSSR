;(function () {
    // найдем элемент textarea
    const textarea = document.querySelector('textarea');

    // функция установки автоматической высоты textarea в зависимости от его содержимого
    const setHeightTextArea = () => {
        // сбросим значение высоты textarea
        textarea.style.height = '';
        // новая высота textarea = полной высоте с учетом прокрутки
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    setHeightTextArea();

    // обработаем набор текста в элементе textarea
    textarea.addEventListener('input', setHeightTextArea);

    // обработка высоты с учетом ресайза страницы
    window.addEventListener('resize', setHeightTextArea);

}());