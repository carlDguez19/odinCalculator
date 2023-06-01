let fn = "";
let sn = "";
let op = "";
let lastPress = "";
const numRegex = /[0-9]/;
const symbolRegex = /[+*.-]/;
execCalc();

function execCalc() {
    let buttons = document.querySelector(".buttonFrame");

    buttons.addEventListener('click', (e) => {
        if(e.target.tagName === 'DIV'){
            console.log(e.target.dataset.value);
        }
    })
};