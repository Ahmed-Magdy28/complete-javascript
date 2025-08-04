'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const imgTargets = document.querySelectorAll('img[data-src]');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

///////////////////////////////////////
// Modal window


const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});









// Button scrolling
btnScrollTo.addEventListener('click', (e) => {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  // // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X, Y)', window.pageXOffset, window.pageYOffset);
  // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  // scrolling

  // window.scrollTo(s1coords.left + pageXOffset, s1coords.top + pageYOffset);
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});



// page navigation

// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click', function(e)  {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__link--btn')) {
    const id = e.target.getAttribute('href');
    // console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed components


// tabs.forEach( tab => tab.addEventListener('click', () => {
//   console.log('tab')
// }))

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard
  if (!clicked) return;
  // console.log(clicked);
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');


// activate conent area
tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


});

// Menu fade animation

const handleHover = function(e, opacity){
if (e.target.classList.contains('nav__link')&& !e.target.classList.contains('nav__link--btn')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sib => {
      if(sib !== link) sib.style.opacity = this;
      // if(sib !== link) sib.style.opacity = opacity;
    });
    logo.style.opacity = this; 
};};



// nav.addEventListener('mouseover',  e => handleHover(e, .5));
// nav.addEventListener('mouseout', e => handleHover(e, 1));

nav.addEventListener('mouseover',  handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords.y)


// window.addEventListener('scroll', e => {
//   // console.log(window.scrollY);
//   window.scrollY > initialCoords.top ? 
//   nav.classList.add('sticky')
//   :nav.classList.remove('sticky')
// });



// sticky navigation: Intersection Observer API

// const obsCallback =  function(entries, observer) {
// entries.forEach(entry =>{
//   console.log(entry)
// })
// };

// const obsOptions = {
//   root: null,
//   threshold: [0,0.2]
// };

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = (entries)=> {
const [entry] = entries;
!entry.isIntersecting ? nav.classList.add('sticky'): nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);





// Reveal sections
// allSections
const revealSection = (entries, observer)=> {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target);
})


};

const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold: 0.15
})
allSections.forEach((section)=>{
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// Lazy loading images
const loadImg = (entries, observer) => {
const [entry] = entries;
if (!entry.isIntersecting) return;
// replacing the src
entry.target.src = entry.target.dataset.src
// entry.target.setAttribute('src', entry.target.dataset.src)
// remove the filter
entry.target.addEventListener('load', ()=> {
  entry.target.classList.remove('lazy-img')
})
observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root:null,
  threshold: 0,
})
rootMargin: '200px'

imgTargets.forEach(img => imgObserver.observe(img))


// slider
const slider = () => {
  let currentSlide = 0;
  const maxSlides = slides.length;
  // functions
  const createDots = ()=>{
    slides.forEach((_,i) =>{
      dotContainer.insertAdjacentHTML('beforeend',
        `<button  title="btn" type="button" class="dots__dot" data-slide="${i}">
        </button>`);
    });
  }
  
  const activateDots = (slide)=> {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
  });
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }
  
  const goToSlide = (slide)=>{
    slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  }
  
  
  const nextSlide = () => {
    currentSlide = currentSlide !== maxSlides - 1 ? currentSlide + 1 : 0;
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };
  const prevSlide = () => {
    currentSlide = currentSlide === 0 ? maxSlides - 1 : currentSlide - 1;
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };
  
  
  const init = (currentSlide) => {
    createDots();
    activateDots(currentSlide);
    goToSlide(currentSlide);
  }
  init(currentSlide);
  
  // event handlers
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click',nextSlide);
  document.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    // e.key === 'ArrowRight'? nextSlide() : null;
    // e.key === 'ArrowLeft'? prevSlide() : null;
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
  dotContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('dots__dot')) {
      currentSlide= Number(e.target.dataset.slide);
    } 
    goToSlide(currentSlide)
    activateDots(currentSlide)
  })
  
  
  // document.addEventListener('keyup',(e)=>{})
  // slider.style.transform = 'scale(0.6)';
  // slider.style.overflow = 'visible';

}   

slider();


// Selecting elements
// 
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);


// console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
document.getElementsByClassName('btn');


// creating and inserting elements
//  .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improving functinality and analytics.';
message.innerHTML = 'we use cookies for improving functinality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// deleting element

document.querySelector('.btn--close-cookie')
  .addEventListener('click', () => {
    message.remove()
    // message.parentElement.removeChild(message);
  });

// styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(message.style.width);

// get style from stylessheet that not js created
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);


message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');




// Attributes

const logo = document.querySelector('.nav__logo');
// logo.src = '../../../'
// console.log(logo.alt)
logo.alt += " i played on the alt"
// console.log(logo.src)
// console.log(logo.alt)

// not standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist')
// console.log(logo.getAttribute('company'));


const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// link.href = 'https://egibest.watch/';
// console.log(link.getAttribute('href'));


// Data attributes

// console.log(logo.dataset.versionNumber);
// console.log(logo.dataset);


// Classes

// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');
// dont use remove all the past classes
// logo.className = 'jonas'





// const alertH1 = (e) => {
//   alert('addEventListener: Great! you are reading the heading');
//   h1.removeEventListener('mouseenter', alertH1);
// }

// h1.addEventListener('mouseenter', alertH1);


// h1.addEventListener('mouseenter', (e) => {
// alert('addEventListener: Great! you are reading the heading');
// });

// h1.onmouseenter = (e) => {
// alert('addEventListener: Great! you are reading the heading');
// };

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`

// // console.log(randomColor())
// document.querySelector('.nav__link').addEventListener('click',function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('link', e.target)

//   // to stop propagation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click',function (e) {
//     this.style.backgroundColor = randomColor();
//   // console.log('links')
// });

// document.querySelector('.nav').addEventListener('click',function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('nav')
// });

const h1 = document.querySelector('h1');
// // going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'red';
// console.log(h1.lastElementChild);
// // going upword : parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // console.log(h1.closest('.header'));
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // going sideways : siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.nextSibling);
// console.log(h1.previousSibling);



// window.addEventListener('beforerunload',function (e)  {
//   e.preventDefault();
//   e.returnValue = ''
// })