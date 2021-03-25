let photographButton = document.querySelector(".photograph-button");
let popUp = document.querySelector(".tooltip");
let sliders = document.querySelector(".sliders");
let buttons = document.querySelectorAll(".ellipse");
let slider = document.querySelector(".sliders-container");
let counter = 0;
var strX;
let bannersliders = document.querySelector(".bannerSliders");
let bannerbuttons = document.querySelectorAll(".banner-ellipse");
let bannerslider = document.querySelector(".banner-container");
let bannercounter = 0;

window.addEventListener("load", hidPopupAfterTime);

photographButton.addEventListener("mouseenter", showPopup);
photographButton.addEventListener("mouseout", hidPopup);

slider.addEventListener("touchstart", swipestart);
slider.addEventListener(
  "touchmove",
  debounce((e) => {
    swipemove(e);
  }, 100)
);
bannerslider.addEventListener("touchstart", swipestart);
bannerslider.addEventListener(
  "touchmove",
   debounce((e) => {
    bannerswipemove(e);
  }, 100)
);

function nextSlides() {
  if (bannercounter >= 2) {
    bannercounter = -1
  }
  bannercounter++
  bannermoveSliders();
  bannerremoveFillEliips();
  banneraddFillEllipse();
}

function prevSlides() {
  if (bannercounter <= 0) {
    bannercounter = 3
  }
  bannercounter--
  bannermoveSliders();
  bannerremoveFillEliips();
  banneraddFillEllipse();
}

bannerbuttons[0].classList.add("bannerShow-fill-ellipse");

bannerbuttons.forEach((itm, i) => {
  itm.addEventListener("click", () => {
    bannercounter = i;
    bannermoveSliders();
    bannerremoveFillEliips();
    banneraddFillEllipse();
  });
});

buttons[0].classList.add("show-fill-ellipse");

buttons.forEach((itm, i) => {
  itm.addEventListener("click", () => {
    counter = i;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  });
});

function swipestart(e) {
  strX = e.touches[0].clientX;
}

function debounce(fun, delay) {
  let time;
  return function (...par) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fun(...par);
    }, delay);
  };
}

function swipemove(e) {
  var touch = e.touches[0];
  var change = strX - touch.clientX;
  console.log(change);
  if (change > 40) {
    if (counter >= 2) {
      return;
    }
    counter++;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  } else if (change < -40) {
    if (counter <= 0) {
      return;
    }
    counter--;
    moveSliders();
    removeFillEliips();
    addFillEllipse();
  }
}

function hidPopupAfterTime() {
  setTimeout(() => {
    popUp.classList.remove("show-after-load");
  }, 15000);
}
function showPopup(e) {
  setTimeout(() => {
    popUp.classList.add("show");
  }, 500);
}
function hidPopup(e) {
  popUp.classList.remove("show");
}
function moveSliders() {
  let moveDistance = sliders.children[0].clientWidth;
  sliders.style.transform = `translateX(${-moveDistance * counter}px)`;
}
function removeFillEliips() {
  buttons.forEach((itm) => itm.classList.remove("show-fill-ellipse"));
}
function addFillEllipse() {
  buttons[counter].classList.add("show-fill-ellipse");
}


function bannerswipemove(e) {
  var touch = e.touches[0];
  var change = strX - touch.clientX;
  console.log(change);
  if (change > 40) {
    if (bannercounter >= 2) {
      return;
    }
    bannercounter++;
    bannermoveSliders();
    bannerremoveFillEliips();
    banneraddFillEllipse();
  } else if (change < -40) {
    if (bannercounter <= 0) {
      return;
    }
    bannercounter--;
    bannermoveSliders();
    bannerremoveFillEliips();
    banneraddFillEllipse();
  }
}

function bannermoveSliders() {
  let moveDistance = bannersliders.children[0].clientWidth;
  bannersliders.style.transform = `translateX(${-moveDistance * bannercounter}px)`;
}
function bannerremoveFillEliips() {
  bannerbuttons.forEach((itm) => itm.classList.remove("bannerShow-fill-ellipse"));
}
function banneraddFillEllipse() {
  bannerbuttons[bannercounter].classList.add("bannerShow-fill-ellipse");
}
