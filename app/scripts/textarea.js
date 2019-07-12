;(function () {
    // найдем элемент textarea
    const textarea = document.querySelector('textarea');

    // обработаем набор текста в элементе textarea
    textarea.addEventListener('input', e => {
        // сбросим значение высоты textarea
        textarea.style.height = '';
        // новая высота textarea = полной высоте с учетом прокрутки
        textarea.style.height = textarea.scrollHeight + 'px';
    });

}());