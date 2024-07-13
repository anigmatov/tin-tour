'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  let autoScrollInterval;

  const scrollStep = slides[0].offsetWidth + 20; // slide width + gap
  let scrollPosition = slider.scrollLeft;

  // Duplicate slides at the end for infinite scroll effect
  function cloneSlides() {
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      slider.appendChild(clone);
    });
  }

  cloneSlides();

  function scrollNext() {
    scrollPosition += scrollStep;
    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    if (scrollPosition >= slider.scrollWidth / 2) {
      scrollPosition = 0;
      slider.scrollTo({
        left: scrollPosition,
        behavior: 'auto'
      });
    }
  }

  function scrollPrev() {
    if (scrollPosition <= 0) {
      scrollPosition = slider.scrollWidth / 2;
      slider.scrollTo({
        left: scrollPosition,
        behavior: 'auto'
      });
    }
    scrollPosition -= scrollStep;
    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(scrollNext, 1000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  prevArrow.addEventListener('click', () => {
    stopAutoScroll();
    scrollPrev();
    startAutoScroll();
  });

  nextArrow.addEventListener('click', () => {
    stopAutoScroll();
    scrollNext();
    startAutoScroll();
  });

  slider.addEventListener('mouseover', stopAutoScroll);
  slider.addEventListener('mouseout', startAutoScroll);

  startAutoScroll();
});