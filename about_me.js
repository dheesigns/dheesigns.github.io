'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}
document.addEventListener("DOMContentLoaded", () => {
    const filterItems = document.querySelectorAll('[data-filter-item]');
});

const filterFunc = function (selectedValue) {
  const filterItems = document.querySelectorAll('[data-filter-item]');
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}

(function() {
    emailjs.init("2YmYsHi04ciA2dr0f");
  })();

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_t2fk4o4", "template_439lsve", this)
      .then(() => {
        showToast("Message Sent Successfully 🎉", true);
        this.reset();
      }, (err) => {
       showToast("Failed! Try again.", false);
    console.error(err);
      });
  });



  function showToast(message, success = true) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.backgroundColor = success ? "#28a745" : "#dc3545"; // green or red
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // disappears after 3 seconds
}

var swiper = new Swiper(".myToolsSwiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 3000,  /* speed of auto slide */
    freeMode: true,
    freeModeMomentum: false,
  });


const flyers = Array.from({ length: 21 }, (_, i) => `flyer (${i + 1}).jpg`);
const vid = Array.from({ length: 1 }, (_, i) => `videoedit${i + 1}.mp4`);

const projectList = document.getElementById('projectList');

flyers.forEach((file, index) => {
  projectList.innerHTML += `
    <li class="project-item active" data-filter-item data-category="flyers">
      <a href="myworks/flyers/${file}" target="_blank">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="myworks/flyers/${file}" 
               alt="Flyer (${index + 1})" loading="lazy">
        </figure>
        <h3 class="project-title">Flyer ${index + 1}</h3>
        <p class="project-category">Flyers</p>
      </a>
    </li>
  `;
});

vid.forEach((file, index) => {
  projectList.innerHTML += `
    <li class="project-item active" data-filter-item data-category="video editing">
      <a href="myworks/videos/${file}" target="_blank">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <video 
          src="myworks/videos/${file}"
          muted
          loop
          playsinline
          preload="metadata">
        </video>

        </figure>
        <h3 class="project-title">video ${index + 1}</h3>
        <p class="project-category">Video Editing</p>
      </a>
    </li>
  `;
});
const titles = [
  "DTP Designer",
  "Video Editor"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;

function typeEffect() {
  const current = titles[index];
  const titleEl = document.getElementById("job-title");

  if (isDeleting) {
    titleEl.textContent = current.substring(0, charIndex--);
  } else {
    titleEl.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => isDeleting = true, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % titles.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();



const carousel = document.querySelector('.testimonials-list');
let items = Array.from(carousel.children);

const itemWidth = items[0].offsetWidth + 20; // card + gap
let indexe = 1;

// Clone first & last
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, items[0]);

items = Array.from(carousel.children);

// Start from first real item
carousel.scrollLeft = itemWidth;

function moveNext() {
  indexe++;
  carousel.scrollTo({
    left: itemWidth * indexe,
    behavior: 'smooth'
  });

  if (indexe === items.length - 1) {
    setTimeout(() => {
      carousel.style.scrollBehavior = 'auto';
      indexe = 1;
      carousel.scrollLeft = itemWidth * indexe;
      carousel.style.scrollBehavior = 'smooth';
    }, 400);
  }
}

function movePrev() {
  indexe--;
  carousel.scrollTo({
    left: itemWidth * indexe,
    behavior: 'smooth'
  });

  if (indexe === 0) {
    setTimeout(() => {
      carousel.style.scrollBehavior = 'auto';
      indexe = items.length - 2;
      carousel.scrollLeft = itemWidth * indexe;
      carousel.style.scrollBehavior = 'smooth';
    }, 400);
  }
}

// Auto scroll
setInterval(moveNext, 3000);

// Optional swipe support
let startX = 0;
carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) moveNext();
  if (endX - startX > 50) movePrev();
});
