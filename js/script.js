let fn = "";
let sn = "";
let op = "";
let wholeFunc = "";
let currentNum = "";
let lastPress = "";
let fnCheck =  false;
// const numRegex = '/^\d+$/'; this will be used as a last resort
// const symbolRegex = /[+*.-]/;
// fn = +fn + +sn;//testing unary operator
// console.log(fn);
// fn += "b";
// fn += "pb";
execCalc();

function execCalc() {//event delegation to determine button clicked
    let buttons = document.querySelector(".buttonFrame");

    buttons.addEventListener('click', (e) => {
        if(e.target.tagName === 'DIV'){
            //console.log(e.target.dataset.value);
            //checkIfNum(e.target.dataset.value);
            if(!isNaN(e.target.dataset.value)){//check if it is a number that is being clicked
                //console.log("its a number");
                // here i will determine if firstNumber(fn) or secondNumber(sn) needs to be filled
                determineNumberFill(e.target.dataset.value);
            }
            else{
                //console.log("its a symbol");
                determineSymbolFill(e.target.dataset.value);
                //here i will determine if it is the first symbol that is clicked or the second, third, etc.
            }
        }
    })
};

function equals(){
    switch(op){
        case "+":
            fn = +fn + +sn;//unary operator to do addition
            sn = "";
            console.log(fn);//current to be displayed
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "-":
            fn = fn - sn;
            sn = "";
            console.log(fn);//current to be displayed
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "*":
            fn = fn * sn;
            sn = "";
            console.log(fn);//current to be displayed
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "/":
            fn = fn / sn;
            sn = "";
            console.log(fn);//current to be displayed
            //display fn as current and append to full arithFunc to display on top left
            break;
    }
}

function clearCalc(){
    lastPress = "";//arithmetic func complete reset everything
    fnCheck = false;
    op = "";
    fn = "";
    sn = "";
    wholeFunc = "";
    currentNum = "";
    displayWhole();
    displayCurrent();
}

function determineSymbolFill(sym){
    //if sym === 'c' should be the very first if statement everything else should be else if
    if(sym === "c"){
        console.log(sym);
        wholeFunc = "";
        clearCalc();
    }
    else if(op === "" && !isNaN(lastPress)){//first time symbol is pressed
        op = sym;
        wholeFunc += sym;
        currentNum = "";
        displayWhole();
        console.log(op);
        fnCheck = true;
        lastPress = "sym";
        //insert display function(append to display "screen")
    }
    else if(op && !isNaN(lastPress)){//chained operation eg 1+2*3-4/5 clear has be able to be called after another symbol
        if(sym === "="){//this else if wont work for clear ie 'c'
            console.log(`${sym} in the right direction`);
            equals();//you do NOT clear calculator..you need to see the result
            wholeFunc += "=";
            currentNum = fn;
            displayWhole();
            displayCurrent();
            //display full arithmetic function with result
        }
        else{
            //second symbol then clear wholeFunc and set append fn to 'new' fn
            equals();
            op = sym;
            currentNum = "";
            updateShortenFunc();
            displayCurrent();
            displayWhole();
            console.log(op);
            fnCheck = true;
            lastPress = "sym";
            //insert display function(append to display "screen")
        }
    }
}

function displayCurrent(){
    let currDisp = document.querySelector(".current");
    currDisp.textContent = currentNum;
}

function updateShortenFunc(){
    wholeFunc = "";
    wholeFunc += fn;
    wholeFunc += op;
}

function displayWhole(){
    let wfunc = document.querySelector(".wholeFunction");
    wfunc.textContent = wholeFunc;
}

function determineNumberFill(num){
    if(fnCheck == true){
        sn += num.toString();
        wholeFunc += num.toString();
        currentNum += num.toString();
        displayWhole();//this will display whole function
        displayCurrent();
        lastPress = num;
        console.log(sn);

    }
    else{
        fn += num.toString();
        wholeFunc += num.toString();
        currentNum += num.toString();
        displayWhole();
        displayCurrent();
        lastPress = num;
        console.log(fn);
    }
    // if(fn === ""){
    //     fn = num;
    //     lastPress = num;
    // }
};

// function checkIfNum(num){//test to make sure that the e.target.dataset.value can be passed as a param
//     if(!isNaN(num)){
//         console.log("numbah govnah!!!");
//     }
//     else{
//         console.log("symbul govnah!!!");
//     }
// }