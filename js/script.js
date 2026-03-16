// ===============================
// Calculator State
// ===============================

// fn = first number entered
// sn = second number entered
// op = current operator (+, -, *, /, ^)
// wholeFunc = full expression shown on the top display
// currentNum = number shown on the main display
// lastPress = tracks last input to prevent invalid sequences (e.g., "..")
// fnCheck = false → entering first number, true → entering second number
// fnDotCheck / snDotCheck = prevent multiple decimals in a number
// equalsJustCalled = tracks whether "=" was just pressed to reset state correctly

let fn = "";
let sn = "";
let op = "";
let wholeFunc = "";
let currentNum = "";
let lastPress = "~";
let fnCheck =  false;
let fnDotCheck = false;
let snDotCheck = false;
let equalsJustCalled = false;

//Initialize calculator
execCalc();

// ===============================
// Event Delegation for Button Clicks
// ===============================

function execCalc() {
    let buttons = document.querySelector(".buttonFrame");

    buttons.addEventListener('click', (e) => {
        if(e.target.tagName === 'DIV'){

            //Number or decimal
            if(!isNaN(e.target.dataset.value) || e.target.dataset.value == "."){
                determineNumberFill(e.target.dataset.value);
            }
            //Operator or control symbol
            else{
                determineSymbolFill(e.target.dataset.value);
            }
        }
    })
};

// ===============================
// Handle Operator / Symbol Input
// ===============================

function determineSymbolFill(sym){

    //Clear calculator
    if(sym === "c"){
        console.log(sym);
        wholeFunc = "";
        clearCalc();
    }

    // If "=" was just pressed, allow chaining new operations
    else if(op === "="){
        if(sym === "="){
            displayError(); // pressing "=" twice is invalid
        }else{
            if(sym != "="){
                equalsJustCalled = false;//if sym !== "="
            }
            else{
                equalsJustCalled = true;
            }
            //Begin new operation after equals
            op = sym;
            wholeFunc += sym;
            currentNum = "";
            fnCheck = true;
            lastPress = "sym";
            displayWhole();
            console.log(op);
        }
    }
    // First operator press (after entering first number)
    else if(op === "" && !isNaN(lastPress)){
        if(sym === "="){//cannot start with '='
            displayError();
        }
        else{
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
    //chained operation eg 1+2*3-4/5
    else if(op && !isNaN(lastPress)){
        equals(); //compute previous operation
        if(fn == NaN){//handle any weird error
            displayError();
        }
        if(wholeFunc === "SyntaxError"){//this should let the division by zero error message stay displayed on the screen
            displayError();//might be better to return this function from the equals function division by zero section instead of repeating this code here
        }
        else if(wholeFunc === "ReallyBigNum"){
            displayBigNumber();
        }
        else{
            if(sym != "="){
                equalsJustCalled = false;//if sym !== "="
            }
            else{
                equalsJustCalled = true;
            }
            op = sym;
            currentNum = fn;
            updateShortenFunc();
            displayCurrent();
            displayWhole();
            console.log(op);
            fnCheck = true;
            lastPress = "sym";
            currentNum = "";
        }
    }
}

// ===============================
// Handle Number Input
// ===============================

function determineNumberFill(num){

    //If equals was just pressed, start a new calculation
    if(equalsJustCalled == true){
        clearCalc();
        equalsJustCalled = false;
    }

    //Entering second number
    if(fnCheck == true){
        if((lastPress == "." && num == ".")|| (snDotCheck && num == ".")){
            displayError();
        }
        else{
            if(num == "."){
                snDotCheck = true;
            }
            sn += num.toString();
            displayNumToString(num);
            lastPress = num;
            console.log(sn);
        }
    }
    else{
        
        //entering first number
        if(wholeFunc === "SyntaxError"){
            displayError();
        }
        else{
            if((lastPress == "." && num == ".")|| (fnDotCheck && num == ".")){
                displayError();
            }
            else{
                if(num == "."){
                    fnDotCheck = true;
                }
                fn += num.toString();
                displayNumToString(num);
                lastPress = num;
                console.log(fn);
            }
        }
    }
};

// ===============================
// Core Operation Logic
// ===============================

function equals(){
    equalsJustCalled = true;
    switch(op){
        case "+":
            fn = +fn + +sn;
            sn = "";
            decimalOrBigNum();
            break;
        case "-":
            fn = fn - sn;
            sn = "";
            decimalOrBigNum();
            break;
        case "*":
            fn = fn * sn;
            sn = "";
            decimalOrBigNum();
            break;
        case "/":
            fn = fn / sn;
            if(sn == "0"){
                return displayError(); //division by zero
            }
            decimalOrBigNum();
            sn = "";
            break;
        case "^":
            fn = fn ** sn;
            sn = "";
            decimalOrBigNum();
            break;
    }
}

// ===============================
// Number Formatting & Limits
// ===============================

//check if number has decimals
function isDecimal(num){
    return (num%1);
}

//Format decimals or detect overflow
function decimalOrBigNum(){
    snDotCheck = false;
    if(isDecimal(fn)){
        fn = +fn.toFixed(2);
        if(fn >= 9999999999){
            displayBigNumber();
        }
    }
    else if(fn >= 999999999999){
        displayBigNumber();
    }
}

// ===============================
// Reset & Error Handling
// ===============================

function clearCalc(){
    lastPress = "";
    fnCheck = false;
    op = "";
    fn = "";
    sn = "";
    wholeFunc = "";
    currentNum = "";
    fnDotCheck = false;
    snDotCheck = false;
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

function displayBigNumber(){
    clearCalc();
    currentNum = "BigNumber";
    displayCurrent();
    wholeFunc = "ReallyBigNum";
    displayWhole();
}

// ===============================
// Display Helpers
// ===============================

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
    displayWhole();
    displayCurrent();
}
