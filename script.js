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
    sessionStorage.setItem(
        `lightMode`,
        JSON.stringify((on))
    );
}

function loadLightMode(){
    if(JSON.parse(sessionStorage.getItem('lightMode'))==null){

    } else {
        on = JSON.parse(sessionStorage.getItem('lightMode'))
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




/*--------------------
Vars
--------------------*/
const $menu = document.querySelector('.menu');
const $items = document.querySelectorAll('.menu--item');
const $images = document.querySelectorAll('.menu--item img');
let menuWidth = $menu.clientWidth;
let itemWidth = $items[0].clientWidth;
let wrapWidth = $items.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;

/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

/*--------------------
Wrap helper
--------------------*/
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  $items.forEach((item, i) => {
    const x = i * itemWidth + scroll;
    const wrappedX = wrap(-itemWidth, wrapWidth - itemWidth, x);
    item.style.transform = `translateX(${wrappedX}px)`;
  });
};
dispose(0);

/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9;
};

/*--------------------
Touch
--------------------*/
let touchStart = 0;
let touchX = 0;
let isDragging = false;

const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  $menu.classList.add('is-dragging');
};

const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};

const handleTouchEnd = () => {
  isDragging = false;
  $menu.classList.remove('is-dragging');
};

/*--------------------
Listeners
--------------------*/
$menu.addEventListener('wheel', handleMouseWheel);

$menu.addEventListener('touchstart', handleTouchStart);
$menu.addEventListener('touchmove', handleTouchMove);
$menu.addEventListener('touchend', handleTouchEnd);

$menu.addEventListener('mousedown', handleTouchStart);
$menu.addEventListener('mousemove', handleTouchMove);
$menu.addEventListener('mouseleave', handleTouchEnd);
$menu.addEventListener('mouseup', handleTouchEnd);

$menu.addEventListener('selectstart', (e) => e.preventDefault());

/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  menuWidth = $menu.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});

/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  const skewX = scrollSpeed * 0.2;
  const rotate = scrollSpeed * 0.01;
  const scale = 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003;

  $items.forEach((item) => {
    item.style.transform += ` skewX(${skewX}deg) rotate(${rotate}deg) scale(${scale})`;
  });
};
render();
