import { SendMail } from './modules/mailer/mailer.js';

// Get Elements
const pages = {
  home: document.querySelector('.home'),
  projects: document.querySelector('.projects'),
  gallery: document.querySelector('.gallery'),
  contact: document.querySelector('.contact'),
};

const enablePage = function (className) {
  pages['home'].classList.add('hidden');
  pages['projects'].classList.add('hidden');
  pages['gallery'].classList.add('hidden');
  pages['contact'].classList.add('hidden');
  pages[className].classList.remove('hidden');
};

const renderContactFormResult = function (result) {
  const resultEl = document.querySelector('.mailStatus');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = result.message;
  setTimeout(function () {
    resultEl.classList.add('hidden');
  }, 10000);
};

const init = function () {
  // Change the Pages
  document.querySelector('.navbar').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('navbar__link')) {
      enablePage(event.target.dataset.elementName);
    }
  });

  // Contact Form Functionality
  const contactForm = document.getElementById('mail-form');
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    SendMail(contactForm)
      .then((data) => {
        return renderContactFormResult(data);
      })
      .catch((err) => {
        return renderContactFormResult(err);
      });
  });
};

init();
