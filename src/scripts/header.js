'use strict';


const header = document.querySelector('.header'),
      headerListIcon = document.querySelector('.header__list'),
      headerCrossIcon = document.querySelector('.header__cross'),
      headerFrame = document.querySelector('.header__frame');

function checkScrollForHeaderItems(item, i, arr) {
    if (i === arr.length - 1) return

    item.classList.remove('hovered');

    if (window.pageYOffset >= getScrollOffset(item.textContent)
        && window.pageYOffset < getScrollOffset(arr[i + 1].textContent)) {
        item.classList.add('hovered');
    }
}

function onWindowScroll(headerItems) {

    if (window.innerWidth > 768) {

        if (window.pageYOffset > 200) {
            header.style.background = 'white';
            header.style.boxShadow = '0 5px 5px rgba(100, 100, 100, .5)';
            header.style.color = 'rgb(39, 159, 195)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'initial';
            header.style.color = 'white';
        }

        headerItems.forEach(checkScrollForHeaderItems);
    }
}

function changeHeader() {
    if (window.innerWidth <= 768) {
        headerListIcon.classList.remove('hidden');
    } else {
        headerListIcon.classList.add('hidden');
    }
}

function toggleHeader() {
    headerFrame.classList.toggle('opened');
    headerListIcon.classList.toggle('hidden');
    headerCrossIcon.classList.toggle('hidden');
}

function onClickIcons() {
    headerListIcon.addEventListener('click', toggleHeader);
    headerCrossIcon.addEventListener('click', toggleHeader);
}


function getScrollOffset(name) {
    return document.querySelector(`[data-${name.toLowerCase()}]`).offsetTop - 60;
}

function scrollPageToBlock(item, isToggle) {
    if (item.textContent !== 'Feedback') {
        window.scrollTo({
            top: getScrollOffset(item.textContent),
            behavior: "smooth"
        });

        if (!isToggle) toggleHeader();
    }
}

export { onWindowScroll, changeHeader, onClickIcons, scrollPageToBlock }