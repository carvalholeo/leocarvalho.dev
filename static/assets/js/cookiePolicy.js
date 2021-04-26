'use strict';

window.addEventListener('load', () => {
  const cookieBanner = document.querySelector('.cookie-banner');
  const close = document.querySelector('.close');

  if (localStorage.getItem('cookieSeen') !== 'shown') {
    fadeIn(cookieBanner, 'flex');
  }

  close.addEventListener('click', (event) => {
    fadeOut(cookieBanner);
    localStorage.setItem('cookieSeen', 'shown');
  })
});


function fadeIn(target, display) {
  target.style.opacity = 0;
  target.style.display = display || "block";
  (function fade() {
      let val = parseFloat(target.style.opacity);
      if (!((val += .06) > 1.2)) {
          target.style.opacity = val;
          requestAnimationFrame(fade);
      }
  })();
}

function fadeOut(target) {
  target.style.opacity = 1;
  (function fade() {
      if ((target.style.opacity -= .1) < 0) {
          target.style.display = "none";
      } else {
          requestAnimationFrame(fade);
      }
  })();
}
