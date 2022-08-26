
const semicolonsElement = document.querySelectorAll('.timer span'),
      minutesElement = document.querySelector('.minutes'),
      hoursElement = document.querySelector('.hours'),
      daysElement = document.querySelector('.days'),
      timerTitle = document.querySelector('.timer .title');

const endTime = new Date('June 1, 2022 14:00:00');
let currColor = 'white',
    iterCounter = 0;

function formatTime(num) {
    const tempNum = Math.floor(num);
    if (tempNum.toString().length < 2) {
        return '0' + tempNum.toString()
    } else {
        return tempNum.toString()
    }
}

export default function createTimer() {

    const changeTime = setInterval(function () {

        const currTime = new Date();
        const difference = Math.floor((endTime - currTime) / 1000);

        const minutes = formatTime((difference / 60) % 60);
        minutesElement.textContent = minutes;

        if (minutes > 0) {
            currColor = currColor === 'white' ? 'transparent' : 'white';
            semicolonsElement.forEach(item => item.style.color = currColor);

            if (iterCounter / 60000 === 0) {
                const hours = formatTime((difference / 60 / 60) % 24);
                const days = formatTime(difference / 60 / 60 / 24);

                hoursElement.textContent = hours;
                daysElement.textContent = days;
            }

        } else {
            clearInterval(changeTime);
            timerTitle.textContent = "It's time to graduate!";
            semicolonsElement.forEach(item => item.style.color = 'white');
        }

        iterCounter++;
    }, 1000);
}