;(function () {    
    // найдем массив скилов js
    const skills = document.querySelectorAll('.slider__level-item');       
    // найдем ползунок
    const pin = document.querySelector('.slider__button');
    // const pinRelativeWrapper = pin.getBoundingClientRect().x - wrapper.getBoundingClientRect().x;
    const pinRelativeScreen = pin.getBoundingClientRect().x;
    // найдем изображение слайдера 
    const sliderPic = document.querySelector('.slider__pic');
    // найдем ширину слайдера 
    const sliderWidth = getComputedStyle(sliderPic).width;
    // найдем положение слайдера по Ох
    const sliderX = sliderPic.getBoundingClientRect().x;
    // считаем свой уровень JS 
    const myLevelJS = document.querySelector('.slider__level').getAttribute('data-level') - 1;
    // признак начала перемещения ползунка
    let isMoved = false;

    // определим % точки, где должен быть ползунок на слайдере
    const sliderBreakpointsXPercentArr = [0, 19.4, 48.5, 100]; // значения вычислены относительно от ширины слайдера
    // массив breakpoints ползунка
    const pinBreakPoints = [];  
    
    // убираем глюк анимации при перезагрузки браузера
    pin.style = 'left: 0;';

    // найдем все breakpoints
    sliderBreakpointsXPercentArr.forEach( (item, index) => {        
        pinBreakPoints.push(item/100 * parseInt(sliderWidth) + sliderX - 8); // -8 это половина от ширины ползунка
    });
    
    // ф-ия перемещения ползунка
    const MovePin = (newLeft) => {
        newLeft -= pinRelativeScreen;
        
        if (newLeft > parseInt(sliderWidth)) {
            pin.style = `left: ${parseInt(sliderWidth)}px;`; 
        }
        else if (newLeft < 0) {
            pin.style = 'left: 0;';
        }
        else {
            pin.style = `left: ${newLeft}px;`;
        }
    }
    
    // обработчик нажатия кнопки мыши
    pin.addEventListener('mousedown', e => {
        // разрешим перемещение ползунка
        isMoved = true;
        // уберем анимацию задержки
        if (!pin.classList.contains('nodelayed')) pin.classList.add('nodelayed');
    });

    window.addEventListener('mouseup', e => {        
        const Mx = e.clientX, // координата по Ох мыши
              pinX = pin.getBoundingClientRect().x; // текущая координата ползунка по Ох
        let breakpointIndex = 0, halfCoord = 0;

        // уберем анимацию задержки
        if (pin.classList.contains('nodelayed')) pin.classList.remove('nodelayed');

        // запретим перемещение ползунка по координатам мыши
        isMoved = false;

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
        if (pinX <= halfCoord) MovePin(pinBreakPoints[breakpointIndex-1]);
        else MovePin(pinBreakPoints[breakpointIndex]);
    });  

    // обработчик перемещения кнопки мыши
    window.addEventListener('mousemove', e => {
        if (isMoved) {
            MovePin(e.clientX);
        }
    });

    // на каждый скилл навесим обработчик кликов для перемещения к нему
    skills.forEach( (item,index) => {
        item.addEventListener('click', e => {
            MovePin(pinBreakPoints[index]);            
        });
    });

    // переместим ползунок в соответствии с нашим скиллом
    MovePin(pinBreakPoints[myLevelJS]);

}());