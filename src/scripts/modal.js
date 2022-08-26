
const modal = document.querySelector('.modal'),
      modalContainer = document.querySelector('.modal__container');

let firstShow = true;
let modalFirstShow = setTimeout(showModal, 10000);

const regExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function showModal() {

    if (firstShow) {
        modal.classList.remove('modal-start');
        clearTimeout(modalFirstShow);
        firstShow = false;
    }

    modal.classList.remove('modal-hide');
    modal.classList.add('modal-show');
    modalContainer.classList.remove('modal__container-hide');
    modalContainer.classList.add('modal__container-show');
}

const hiding = () => {
    modal.classList.remove('modal-show');
    modal.classList.add('modal-hide');
    modalContainer.classList.remove('modal__container-show');
    modalContainer.classList.add('modal__container-hide');
}

function clearModalAfterSubmit(e, selector, defaultText) {
    console.log(345);
    const hidingTimeout = setTimeout(() => {

        hiding();
        clearTimeout(hidingTimeout);
        document.querySelector(`${selector} .subtitle`).textContent = defaultText;
        // document.querySelector(`${selector} .button`).removeAttribute('disabled');

    }, 1500);
}

function hideModal(e) {
    if (e.target.className.indexOf('modal') > -1) hiding();
}

function addErrorHighlight(element, errorElem, text) {
    element.classList.add('form__error');
    errorElem.classList.remove('hidden');
    errorElem.textContent = text;

    return false
}

function validateFields(selector) {
    let correct = true;
    const inputFields = document.querySelectorAll(`${selector} .form__item`),
          textareaField = document.querySelector(`${selector} .form__textarea`),
          inputErrorFields = document.querySelectorAll(`${selector} .form__error-text`),
          textareaErrorField = textareaField.parentElement.lastElementChild;

    inputFields.forEach((item, i) => {

        if (item.value.length === 0) {
            correct = addErrorHighlight(item, inputErrorFields[i], "This field can't be empty");
        } else if (item.name === 'email') {
            if (item.value.match(regExpression) === null) {
                correct = addErrorHighlight(item, inputErrorFields[i], "Enter correct email");
            }
        }

    });

    if (textareaField.value.length === 0) {
        correct = addErrorHighlight(textareaField, textareaErrorField, "This field can't be empty");
    }

    const requestCallback = (text) => {
        document.querySelector(`${selector} .subtitle`).textContent = text;
        clearFields([...inputFields, textareaField]);
    }
    return [correct, requestCallback]
}

function clearFields(fields) {
    for (let f of fields) {
        f.value = '';
    }
}

function removeErrorHighlight(item) {
    item.addEventListener('mousedown', () => {
        item.classList.remove('form__error');
        item.parentElement.lastElementChild.classList.add('hidden');
    });
}

export { removeErrorHighlight, showModal, hideModal, validateFields, clearFields, clearModalAfterSubmit, modal };


