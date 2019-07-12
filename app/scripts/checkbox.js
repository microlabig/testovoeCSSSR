// для A11y

;(function () {
    // найдем список всех скилов
    const skillsList = document.querySelector('.skills__list');

    // обработаем на нем событие onClick
    skillsList.addEventListener('click', e => {
        // определим элемент, вызвавший событие (закэшируем)
        const target = e.target;
        // если это кнопка
        if (target.tagName === 'BUTTON') {          
            // найдем элемент label  
            const label = target.parentNode.parentNode;
            // и сэмулируем клик
            label.click();       
        }
    });

}());