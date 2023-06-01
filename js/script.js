let fn = "";
let sn = "";
let op = "";
let lastPress = "";
const numRegex = '/^\d+$/';
const symbolRegex = /[+*.-]/;
execCalc();

function execCalc() {
    let buttons = document.querySelector(".buttonFrame");

    buttons.addEventListener('click', (e) => {
        if(e.target.tagName === 'DIV'){
            console.log(e.target.dataset.value);
            if(!isNaN(e.target.dataset.value)){
                console.log("its a numbah!!");
            }
            else if(e.target.dataset.value == /[*+/-]/){
                console.log("its a symbul eeee");
            }
        }
    })
};