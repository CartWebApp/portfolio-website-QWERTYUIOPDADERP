// let flashlight = document.getElementById('interactive');
// let mainScrollArrow = document.getElementById('mainScrollArrow');

// let h1 = document.querySelectorAll("h1");
// let p = document.querySelectorAll("p");

// document.addEventListener('DOMContentLoaded', () => {
//     const interBubble = document.getElementById('interactive');
//     let curX = 0;
//     let curY = 0;
//     let tgX = 0;
//     let tgY = 0;

//     function move() {
//         curX += (tgX - curX) / 20;
//         curY += (tgY - curY) / 20;
//         interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
//         requestAnimationFrame(() => {
//             move();
//         });
//     }

//     window.addEventListener('mousemove', (event) => {
//         tgX = event.clientX;
//         tgY = event.clientY;
//     });

//     move();
// });

// setTimeout(() => {
//     flashlight.className = 'fadeIn';
// }, 10000);

// setTimeout(() => {
//     flashlight.style.opacity = 1;
//     h1.forEach(element => {
//         element.classList.add('flicker');
//     });
//     p.forEach(element => {
//         element.classList.add('flicker');
//     });
//     mainScrollArrow.classList.add('flicker');
// }, 14900);

$(document).ready(function() {
    $(this).mousemove(function(e) {
      $("#light").css({
        "top": e.pageY - 250,
        "left": e.pageX - 250
      })
    }).mousedown(function(e) {
      switch (e.which) {
          case 1:
              $("#light").toggleClass("light-off");
              break;
          case 2:
              console.log('Middle Mouse button pressed.');
              break;
          case 3:
              console.log('Right Mouse button pressed.');
              break;
          default:
              console.log('You have a strange Mouse!');
      }
    })
  })