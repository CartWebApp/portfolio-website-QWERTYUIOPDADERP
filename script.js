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

// The darkness fade in at the start
let timeoutID = setTimeout(() => {
    flashlight.className = 'fadeIn';
    cursor.className = 'overlay fadeIn';
}, 10000);

let timeoutID2;

// The text border color flicker
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

// On page load
document.addEventListener('DOMContentLoaded', () => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    makeThemFlicker(13000);

    // Moves the flashlight if the lights aren't on
    function move() {
        curX += (tgX - curX) / 2;
        curY += (tgY - curY) / 2;
        if(!on){
            // Flashlight is composed of two pieces - the black overlay and the bright underlay.
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            cursor.style.left = `${Math.round(curX)}px`;
            cursor.style.top = `${Math.round(curY)}px`;
        }
        requestAnimationFrame(() => {
            move();
        });
    }

    // On mouse move change the target position for the flashlight.
    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    // Check if light/dark mode saved and if so load it
    loadLightMode();

    move();
});

//Toggles the light / flashlight
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
    // Saves light / flashlight mode to session storage
    saveLightMode();
}

// I chose to use session instead of local storage so users would experience the power loss animation each time they revisted
function saveLightMode(){
    sessionStorage.setItem(
        `lightMode`,
        JSON.stringify((on))
    );
}

// Checks if light/dark mode is saved and if so loads it, canceling the slow fade-in as well
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

// The carousel stuff

const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu--item');
const menuImages = document.querySelectorAll('.menu--item img');
let menuWidth = menu.clientWidth;
let itemWidth = menuItems[0].clientWidth;
let wrapWidth = menuItems.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;

// Some mathy interpolation stuff I took off the internet
const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

// Set up the x scroll for each image
const dispose = (scroll) => {
  menuItems.forEach((item, i) => {
    const x = i * itemWidth + scroll;
    const wrappedX = wrap(-itemWidth, wrapWidth - itemWidth, x);
    item.style.transform = `translateX(${wrappedX}px)`;
  });
};
dispose(0);

// Accepts the mouse wheel inputs to create scrolling
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9;
};

// Accepts mouse grab inputs to create scrolling
let touchStart = 0;
let touchX = 0;
let isDragging = false;

const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  menu.classList.add('is-dragging');
};

const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};

const handleTouchEnd = () => {
  isDragging = false;
  menu.classList.remove('is-dragging');
};


menu.addEventListener('wheel', handleMouseWheel);

menu.addEventListener('touchstart', handleTouchStart);
menu.addEventListener('touchmove', handleTouchMove);
menu.addEventListener('touchend', handleTouchEnd);

menu.addEventListener('mousedown', handleTouchStart);
menu.addEventListener('mousemove', handleTouchMove);
menu.addEventListener('mouseleave', handleTouchEnd);
menu.addEventListener('mouseup', handleTouchEnd);

menu.addEventListener('selectstart', (e) => e.preventDefault());

// Some dynamic resizing so the images don't clip
window.addEventListener('resize', () => {
  menuWidth = menu.clientWidth;
  itemWidth = menuItems[0].clientWidth;
  wrapWidth = menuItems.length * itemWidth;
});

// Loads the motion and image positions
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  const skewX = scrollSpeed * 0.2;
  const rotate = scrollSpeed * 0.01;
  const scale = 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003;

  menuItems.forEach((item) => {
    item.style.transform += ` skewX(${skewX}deg) rotate(${rotate}deg) scale(${scale})`;
  });
};
render();
