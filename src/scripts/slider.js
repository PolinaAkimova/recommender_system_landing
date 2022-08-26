
const slider = document.querySelector('.slider'),
      sliderContainer = document.querySelector('.slider__container'),
      sliderSubtitle = document.querySelector('.architecture .subtitle'),
      sliderText = document.querySelector('.architecture .text'),
      sliderDots = document.querySelectorAll('.slider__dot');

let currentSlide = 0,
    sliderData = [],
    numSlides = 0;


function changeSlide(length, idx) {
    sliderContainer.style.cssText = `
        transform: translateX(-${length * idx}px);
        transition: .5s;
    `;

    sliderDots.forEach(item => {
        item.style.cssText = `
            filter: brightness(100%);
            transition: .3s;
        `;
    });

    sliderDots[idx].style.cssText = `
        filter: brightness(60%);
        transition: .3s;
    `;

    sliderText.innerHTML = sliderData[idx].text;
    sliderSubtitle.textContent = sliderData[idx].subtitle;
}

function initSlider(data) {
    sliderData = data;
    numSlides = data.length;
    changeSlide(slider.offsetWidth, 0);
}

function scrollToRight() {
    currentSlide += 1;
    if (currentSlide === numSlides) currentSlide = 0;
    changeSlide(slider.offsetWidth, currentSlide);
}

function scrollToLeft() {
    currentSlide -= 1;
    if (currentSlide === -1) currentSlide = numSlides - 1;
    changeSlide(slider.offsetWidth, currentSlide);
}

function scrollByDots(item, i) {
    item.addEventListener('click', () => {
        currentSlide = i;
        changeSlide(slider.offsetWidth, i);
    });
}


export { initSlider, scrollToRight, scrollToLeft, scrollByDots, sliderDots }