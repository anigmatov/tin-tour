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
  const slider = document.querySelector('.trip__grid');
  const slides = Array.from(document.querySelectorAll('.trip__card'));
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  let autoScrollInterval;

  const scrollStep = slides[0].offsetWidth + 20; // slide width + gap
  let scrollPosition = slider.scrollLeft;

  // Clone slides for infinite scroll effect
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
    autoScrollInterval = setInterval(scrollNext, 3000);
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

// Function to show the popup form
function showPopupForm() {
  document.getElementById("popup-form").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Function to hide the popup form
function hidePopupForm() {
  document.getElementById("popup-form").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Function to show success message popup
function showSuccessPopup() {
  document.getElementById("success-popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Function to hide success message popup
function hideSuccessPopup() {
  document.getElementById("success-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Handle form submission
document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var formData = new FormData(this);

  // Prepare data to send to Google Sheets (replace with your Google Sheets script URL)
  var scriptURL = 'https://script.google.com/macros/s/AKfycbx7yQDiV9mUAiZb_BgORaLS6r8-hepxJsb1a3dwOVp3p1diWoJ2F6v5B--mJzY1jvb7AA/exec';
  var data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      travelType: formData.get('travel-type'),
      travelClass: formData.get('travel-class'),
      priceStart: formData.get('price-start'),
      priceEnd: formData.get('price-end'),
      startDate: formData.get('start-date'),
      endDate: formData.get('end-date')
  };

  // Send data to Google Sheets using Fetch API
  fetch(scriptURL, { method: 'POST', body: JSON.stringify(data) })
      .then(response => {
          if (response.ok) {
              console.log('Success!', response);
              document.getElementById("submit-message").style.display = "block";
              document.getElementById("booking-form").reset(); // Optional: Reset form after submission
              hidePopupForm(); // Close the form popup
              showSuccessPopup(); // Show success message popup
          } else {
              throw new Error('Network response was not ok.');
          }
      })
      .catch(error => {
          console.error('Error!', error);
          // Handle error if submission fails
      });
});

// Button click event to show popup form
document.querySelectorAll('.open-form-btn').forEach(button => {
  button.addEventListener('click', showPopupForm);
});

// Close popup form when clicking outside of it
window.onclick = function(event) {
  var popup = document.getElementById("popup-form");
  var successPopup = document.getElementById("success-popup");
  var overlay = document.getElementById("overlay");
  
  if (event.target == overlay) {
      hidePopupForm();
      hideSuccessPopup();
  }
};
