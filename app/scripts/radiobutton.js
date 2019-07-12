// для A11y

;(function () {
    // найдем все radioButton
    const radios = document.querySelectorAll('.future__radiobutton');
    // найдем все radioButton-fake
    const radioButtons = document.querySelectorAll('.future__radio-btn');
    
    radioButtons.forEach( (button,index) => {
        // на каждую fake-кнопку навесим обработчик кликов
        button.addEventListener('click', e => {
            // изменим состояния текущего свойства checked у radioButton
            radios[index].checked = true;
        });
    });   
}());