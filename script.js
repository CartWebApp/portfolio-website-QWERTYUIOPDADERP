let flashlight = document.getElementById('interactive');
let mainScrollArrow = document.getElementById('mainScrollArrow');
let chain = document.getElementById('pullchain');

let h1 = document.querySelectorAll("h1");
let p = document.querySelectorAll("p");
let a = document.querySelectorAll("a");
let on = false;
const interBubble = document.getElementById('interactive');
const cursor = document.getElementById("cursor");

document.addEventListener('DOMContentLoaded', () => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
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

    move();
});

setTimeout(() => {
    flashlight.className = 'fadeIn';
    cursor.className = 'overlay fadeIn';
}, 10000);

setTimeout(() => {
    flashlight.style.opacity = 1;
    cursor.style.opacity = 1;
    h1.forEach(element => {
        element.classList.add('flicker');
    });
    a.forEach(element => {
        element.classList.add('flicker');
    });
    p.forEach(element => {
        element.classList.add('flicker');
    });
    mainScrollArrow.classList.add('flicker');
    chain.classList.add('letThereBeChain');
}, 14900);

function toggleLight(){
    on = !on;
    interBubble.classList.toggle('on');
    cursor.classList.toggle('on');
    h1.forEach(element => {
        element.classList.toggle('on');
    });
    a.forEach(element => {
        element.classList.toggle('on');
    });
    p.forEach(element => {
        element.classList.toggle('on');
    });
    mainScrollArrow.classList.toggle('on');
}