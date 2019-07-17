;(function () {    
    // найдем секцию со слайдером
    const jslevel = document.querySelector('.jslevel');
    // найдем слайдер для дальнейшей обработки кликов по нему
    const sliderWrapper = document.querySelector('.slider'); 
    // найдем массив скилов js
    const skills = document.querySelectorAll('.slider__level-item');  
    // найдем ползунок
    const pin = document.querySelector('.slider__button');
    // определим положение ползунка по Ох
    let pinRelativeScreen = pin.getBoundingClientRect().x;
    // найдем изображение слайдера 
    const sliderPic = document.querySelector('.slider__pic');
    // найдем ширину слайдера 
    const sliderWidth = getComputedStyle(sliderPic).width;
    // найдем положение слайдера по Ох
    const sliderX = sliderPic.getBoundingClientRect().x;
    // считаем свой уровень JS 
    const myLevelJS = document.querySelector('.slider__level').getAttribute('data-level') - 1;

    // определим % точки, где должен быть ползунок на слайдере
    let sliderBreakpointsXPercentArr = [0, 19.4, 48.5, 100]; // значения вычислены относительно от ширины слайдера
    // массив breakpoints ползунка
    let pinBreakPoints = []; 
    
    let isMoved = false,       // признак начала перемещения ползунка
        isSliderClick = false; // признак клика по слайдеру 
        
    // новое положение ползунка
    let newLeft = 0;    
    
    // убираем 'глюк' анимации при перезагрузки браузера
    pin.style = 'left: 0;'; 

    // ф-ия определения всех точек breakpoint слайдера
    let setPinBreakPoints = (sWidth, sX) => {
        pinBreakPoints = [];
        // найдем все breakpoints
        sliderBreakpointsXPercentArr.forEach( item => {        
            pinBreakPoints.push(item/100 * parseInt(sWidth) + sX - 8); // -8 это ~ половина от ширины ползунка
        });
    }    
    
    // ф-ия перемещения ползунка
    const movePin = (left) => {
        left -= pinRelativeScreen;
        
        if (left > parseInt(sliderWidth)) {
            pin.style = `left: ${parseInt(sliderWidth)}px;`; 
        }
        else if (left < 0) {
            pin.style = 'left: 0;';
        }
        else {
            pin.style = `left: ${left}px;`;
        }
    }

    // функция перемещения ползунка к ближайшему breakpoint
    const putPinToBreakPoint = (pinX) => {
        let breakpointIndex = 0, halfCoord = 0;               
        // определить м/у какими breakpoints находится ползунок
        for (let i=1; i<pinBreakPoints.length; i++) { // "1" это не берем в расчет первый breakpoints, т.к. ползунок 100 % находится м/у 1 и последним breakpoint'ами            
            if (pinBreakPoints[i] - pinX > 0) {
                breakpointIndex = i; // найденный ползунок находится м/у (pinBreakPoints[breakpointIndex-1],pinBreakPoints[breakpointIndex])
                break;
            }
        }
        // найдем половинную координату Ох
        halfCoord = (pinBreakPoints[breakpointIndex] - pinBreakPoints[breakpointIndex-1]) / 2 + pinBreakPoints[breakpointIndex-1];
        // в зависимости к какой границе ближе находится ползунок, к той и переместим его
        if (pinX <= halfCoord) movePin(pinBreakPoints[breakpointIndex - 1]);
        else movePin(pinBreakPoints[breakpointIndex]); 
    }

    // ф-ия разрешение перемещения ползунка (старт перемещения)
    const movedPinStart = e => {
        // разрешим перемещение ползунка
        isMoved = true;
        // уберем анимацию задержки
        if (!pin.classList.contains('nodelayed')) pin.classList.add('nodelayed');
    }
    // ф-ия перемещения ползунка
    const movedPinMove = x => {
        if (isMoved) {
            newLeft = parseInt(x);
            // переместим ползунок на новое место
            movePin(x);
        }
    }
    // ф-ия завершения перемещения ползунка
    const movedPinEnd = x => {
        // уберем анимацию задержки
        if (pin.classList.contains('nodelayed')) pin.classList.remove('nodelayed'); 
        // и переместим к ближацшему breakpoints
        putPinToBreakPoint(x);
        // запретим перемещение ползунка по координатам мыши
        isMoved = false;
    }

    // определим начальные breakpoints
    setPinBreakPoints(sliderWidth, sliderX);

    //--------------------------------
    //       обработчики событий
    //--------------------------------

    // обработчик кликов по слайдеру
    sliderPic.addEventListener('click', e => {
        const target = e.target, cX = e.clientX;

        // если это не список со скиллами или скилы, то переместить к ближайшей точке        
        if (target.tagName !== 'UL' && target.tagName !== 'LI' && target.tagName !== 'P') {
            isSliderClick = true; // зафиксировать признак клика по слайдеру
            newLeft = parseInt(cX); // запомним куда должен переместиться ползунок
            movePin(newLeft); // переместить ползунок на новое место  
        }
    });

    // на каждый скилл навесим обработчик кликов для перемещения к нему
    skills.forEach( (item, index) => {
        item.addEventListener('click', e => {
            movePin(pinBreakPoints[index]); 
        });
    });
    
    // обработчик нажатия кнопки мыши
    pin.addEventListener('mousedown', e => movedPinStart(e)); 

    // обработчик начала touch-события (TouchEvent)
    pin.addEventListener('touchstart', e => {
        const type = e.type, 
              touch = (type === 'touchstart') ? e.targetTouches : e; // закешируем массив текущих нажатий
        // если палец один
        if (touch.length === 1) {
            movedPinStart(e);
        }
    });    

    // обработчик перемещения кнопки мыши
    jslevel.addEventListener('mousemove', e => movedPinMove(e.clientX));

    // обработчик перемещения ползунка (TouchEvent)
    jslevel.addEventListener('touchmove', e => {
        const touch = e.targetTouches; // закешируем массив текущих нажатий         
        
        if (touch.length === 1) {
            movedPinMove(touch[0].pageX);
        }
    });
    
    // обработчик прекращения нажатия кнопки мыши   
    jslevel.addEventListener('mouseup', e => movedPinEnd(e.clientX));

    // обработчик убирания пальца с ползунка (окончание перемещения) (TouchEvent)
    jslevel.addEventListener('touchend', movedPinEnd(newLeft));

    // обработчик окончания анимации перемещения ползунка
    pin.addEventListener('transitionend', e => {
        if (isSliderClick) { // если кликнули по слфйдеру
            putPinToBreakPoint(newLeft); // переместить ползунок к ближайшему breakpoint
            isSliderClick = false; // убрать признак
        }
    });    
    
    // переместить ползунок в место по-умолчанию в зависимости от ресайза окна
    window.addEventListener('resize', e => {
        // рассчитаем заново ширину слайдера и его смещение по Ох от левого края 
        const w = getComputedStyle(sliderPic).width,
              x = sliderPic.getBoundingClientRect().x;

        // определим минимальное смещение по Ох от левой границы
        pinRelativeScreen = parseInt(x);
        // рассчитаем заново breakpoints
        setPinBreakPoints(w,x);
        // переместим ползунок к breakpoint по-умолчанию
        movePin(pinBreakPoints[myLevelJS]);
    });
    

    // переместим ползунок в соответствии с нашим скиллом
    movePin(pinBreakPoints[myLevelJS]);
}());