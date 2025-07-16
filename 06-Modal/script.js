'use strict';


const btns = document.querySelectorAll('.show-modal');
const hiddenDiv = document.querySelector('.modal');
const backGroundOverlay = document.querySelector('.overlay');
const close_btn = document.querySelector('.close-modal');
function removeHidden() {
    hiddenDiv.classList.remove('hidden');
    backGroundOverlay.classList.remove('hidden');
}

function hide() {
    hiddenDiv.classList.add('hidden');
    backGroundOverlay.classList.add('hidden');
}
btns.forEach(buttons => {
    buttons.addEventListener('click', removeHidden);
});
close_btn.addEventListener('click', hide);


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        hide();
    }
});
