let flashlight = document.getElementById('interactive');
let mainScrollArrow = document.getElementById('mainScrollArrow');
let chain = document.getElementById('pullchain');

let h1 = document.querySelectorAll("h1");
let h2 = document.querySelectorAll("h2");
let p = document.querySelectorAll("p");
let a = document.querySelectorAll("a");
let on = false;
const interBubble = document.getElementById('interactive');
const cursor = document.getElementById("cursor");

let timeoutID = setTimeout(() => {
    flashlight.className = 'fadeIn';
    cursor.className = 'overlay fadeIn';
}, 10000);

let timeoutID2;

function makeThemFlicker(delay){
    timeoutID2 = setTimeout(() => {
        flashlight.style.opacity = 1;
        cursor.style.opacity = 1;
        h1.forEach(element => {
            element.classList.add('flicker');
        });
        h2.forEach(element => {
            element.classList.add('flicker');
        });
        a.forEach(element => {
            element.classList.add('flicker');
        });
        p.forEach(element => {
            element.classList.add('flicker');
        });
        if(mainScrollArrow){
            mainScrollArrow.classList.add('flicker');
        }
        chain.classList.add('letThereBeChain');
    }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    makeThemFlicker(13000);

    function move() {
        curX += (tgX - curX) / 2;
        curY += (tgY - curY) / 2;
        if(!on){
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            cursor.style.left = `${Math.round(curX)}px`;
            cursor.style.top = `${Math.round(curY)}px`;
        }
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    loadLightMode();

    move();
});

function toggleLight(i=true){
    if(i) {
        on = !on;
    }
    interBubble.classList.toggle('on');
    cursor.classList.toggle('on');
    h1.forEach(element => {
        element.classList.toggle('on');
    });
    h2.forEach(element => {
        element.classList.toggle('on');
    });
    a.forEach(element => {
        element.classList.toggle('on');
    });
    p.forEach(element => {
        element.classList.toggle('on');
    });
    if(mainScrollArrow){
        mainScrollArrow.classList.toggle('on');
    }
    saveLightMode();
}

function saveLightMode(){
    localStorage.setItem(
        `lightMode`,
        JSON.stringify((on))
    );
}

function loadLightMode(){
    if(JSON.parse(localStorage.getItem('lightMode'))==null){

    } else {
        on = JSON.parse(localStorage.getItem('lightMode'))
        clearTimeout(timeoutID);
        flashlight.className = 'fadeInQuick';
        cursor.className = 'overlay fadeInQuick';
        clearTimeout(timeoutID2);
        makeThemFlicker(500);
        if(on){
            toggleLight(false);
        }
    }
}