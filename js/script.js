let fn = "";
let sn = "";
let op = "";
let wholeFunc = "";
let currentNum = "";
let lastPress = "~";
let fnCheck =  false;
let fnDotCheck = false;
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
            if(!isNaN(e.target.dataset.value) || e.target.dataset.value == "."){//check if it is a number that is being clicked
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

function determineSymbolFill(sym){
    //if sym === 'c' should be the very first if statement everything else should be else if
    if(sym === "c"){
        console.log(sym);
        wholeFunc = "";
        clearCalc();
    }
    // else if(sym === "."){
    //     if(op === "."){
    //         displayError();
    //         op = sym;
    //     }
    //     else if(fnDotCheck == false && !isNaN(lastPress)){
    //         op = sym;
    //         lastPress = "sym";
    //         fn += ".";
    //         wholeFunc += ".";
    //         currentNum += ".";
    //         displayWhole();
    //         displayCurrent();
    //         fnDotCheck = true;
    //     }
    //     else if(fnDotCheck == true && !isNaN(lastPress)){
    //         op = sym;
    //         lastPress = "sym";
    //         sn += ".";
    //         wholeFunc += ".";
    //         currentNum += ".";
    //         displayWhole();
    //         displayCurrent();
    //     }
    // }
    else if(op === "="){//doing operations after pressing = without clearing calc
        //enter to do operation after pressing equals sign
        if(sym === "="){//if we try to press = after it was just pressed
            displayError();
        }else{//the code below can be placed in a function and used for the bottom piece of code
            op = sym;
            wholeFunc += sym;
            currentNum = "";
            fnCheck = true;
            lastPress = "sym";
            displayWhole();
            console.log(op);
        }
    }
    else if(op === "" && !isNaN(lastPress)){//first time symbol is pressed
        if(sym === "="){//if no operator has been chosen first 'operator' cannot be '='
            displayError();
        }
        else{//the code below can be placed in a function and used for the top piece of code
            op = sym;
            wholeFunc += sym;
            currentNum = "";
            fnCheck = true;
            lastPress = "sym";
            displayWhole();
            console.log(op);
            //insert display function(append to display "screen")
        }
    }
    else if(op && !isNaN(lastPress)){//chained operation eg 1+2*3-4/5 clear has be able to be called after another symbol
        //else{
        //second symbol then clear wholeFunc and set append fn to 'new' fn
        equals();
        op = sym;
        currentNum = fn;
        updateShortenFunc();
        displayCurrent();
        displayWhole();
        console.log(op);
        fnCheck = true;
        lastPress = "sym";
        currentNum = "";
        //insert display function(append to display "screen")
        //}
    }
}

function determineNumberFill(num){
    if(fnCheck == true){
        sn += num.toString();
        displayNumToString(num);
        lastPress = num;
        console.log(sn);

    }
    else{
        if(wholeFunc === "SyntaxError"){
            displayError();
        }
        else{
            fn += num.toString();
            displayNumToString(num);
            lastPress = num;
            console.log(fn);
        }
    }
    // if(fn === ""){
    //     fn = num;
    //     lastPress = num;
    // }
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
            if(isDecimal(fn)){
                fn = fn.toFixed(2);
            }
            sn = "";
            console.log(fn);//current to be displayed
            //display fn as current and append to full arithFunc to display on top left
            break;
    }
}

function isDecimal(num){
    return (num%1);
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

function displayError(){
    clearCalc();
    currentNum = "ERR";
    displayCurrent();
    wholeFunc = "SyntaxError";
    displayWhole();
}

function displayCurrent(){
    let currDisp = document.querySelector(".current");
    currDisp.textContent = currentNum;
}

function updateShortenFunc(){
    wholeFunc = "";
    wholeFunc += fn;
    if(op != "="){
        wholeFunc += op;
    }
}

function displayWhole(){
    let wfunc = document.querySelector(".wholeFunction");
    wfunc.textContent = wholeFunc;
}

function displayNumToString(num){
    wholeFunc += num.toString();
    currentNum += num.toString();
    displayWhole();//this will display whole function
    displayCurrent();
}

// function checkIfNum(num){//test to make sure that the e.target.dataset.value can be passed as a param
//     if(!isNaN(num)){
//         console.log("numbah govnah!!!");
//     }
//     else{
//         console.log("symbul govnah!!!");
//     }
// }

//else if(op && !isNaN(lastPress)){//chained operation eg 1+2*3-4/5 clear has be able to be called after another symbol
    // if(sym === "="){//this else if wont work for clear ie 'c'
    //     console.log(`${sym} in the right direction`);
    //     equals();//you do NOT clear calculator..you need to see the result
    //     wholeFunc += "=";
    //     currentNum = fn;
    //     displayWhole();
    //     displayCurrent();
    //     //display full arithmetic function with result
    // }