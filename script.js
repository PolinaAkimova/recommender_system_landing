'use strict';


import {
    modal,
    hideModal,
    removeErrorHighlight,
    showModal,
    validateFields,
    clearModalAfterSubmit
} from "./src/scripts/modal.js";
import {changeHeader, onClickIcons, onWindowScroll, scrollPageToBlock} from "./src/scripts/header.js";
import {initSlider, scrollToRight, scrollToLeft, scrollByDots, sliderDots} from "./src/scripts/slider.js";
import createTimer from "./src/scripts/timer.js";
import {getData, sendData} from "./src/scripts/request.js";


window.addEventListener('DOMContentLoaded', () => {
    // optimizing events
    (function() {
        const throttle = function(type, name) {
            let running = false;

            const func = function() {
                if (running) return

                running = true;
                requestAnimationFrame(function() {
                    window.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            window.addEventListener(type, func);
        };

        throttle("resize", "optimizedResize");
    })();


    // from modal.js
    const headerItems = document.querySelectorAll('.header__item');
    const inputElements = document.querySelectorAll('input[type="text"]'),
          modalForm = document.querySelector('.modal form'),
          contactForm = document.querySelector('.form form'),
          textareaElements = document.querySelectorAll('textarea');

    inputElements.forEach(removeErrorHighlight);
    textareaElements.forEach(removeErrorHighlight);

    headerItems[4].addEventListener('click', showModal);
    modal.addEventListener('mousedown', (e) => hideModal(e));

    function makeRequestWithFormData(e, ...args) {
        e.preventDefault();
        const [correct, requestCallback] = validateFields(args[0]);

        if (correct) {

            // document.querySelector(`${args[0]} .button`).setAttribute('disabled', '');
            const data = new FormData(this);
            const json = JSON.stringify(Object.fromEntries(data.entries()));

            sendData('http://localhost:3000/feedback', json)
                .then(() => requestCallback('Thank you! We will inform you about the results.'))
                .then(() => clearModalAfterSubmit(e, ...args))
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    modalForm.addEventListener('submit', (e) => makeRequestWithFormData.call(modalForm, e, '.modal',
                                                                      'Have any ideas? Write here'));
    contactForm.addEventListener('submit', (e) => makeRequestWithFormData.call(contactForm, e, '.form',
                                                                      'Fill in the details'));


    // from header.js
    const bannerButton = document.querySelector('.banner .button');

    window.addEventListener('scroll', () => onWindowScroll(headerItems));
    changeHeader();
    window.addEventListener("optimizedResize", changeHeader);
    onClickIcons();

    for (let item of headerItems) {
        item.addEventListener('click', () => scrollPageToBlock(item));
    }

    bannerButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollPageToBlock(headerItems[0], true);
    });


    // from slider.js
    const sliderRight = document.querySelector('.slider__arrow-right'),
          sliderLeft = document.querySelector('.slider__arrow-left');

        // from request.js
    getData('http://localhost:3000/dev_info')
        .then(response => {
            initSlider(response);
        })
        .catch(e => console.log(e));

    sliderRight.addEventListener('click', scrollToRight);
    sliderLeft.addEventListener('click', scrollToLeft);
    sliderDots.forEach(scrollByDots);


    // from timer.js
    createTimer();
});

