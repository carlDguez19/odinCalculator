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
    if(sym === "c"){
        console.log(sym);
        wholeFunc = "";
        clearCalc();
    }
    else if(op === "="){//doing operations after pressing = without clearing calc
        //enter to do operation after pressing equals sign
        if(sym === "="){//if we try to press = after it was just pressed
            displayError();
        }else{//the code below can be placed in a function and used for the bottom piece of code
            //insert code here same as below
            if(sym != "="){
                equalsJustCalled = false;//if sym !== "="
            }
            else{
                equalsJustCalled = true;
            }
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
        //if(wholeFunc === "ReallyBigNum"){displayBigNum()}
        //else if(wholeFunc === "SyntaxError"){displayError()}
        //VVV that if becomes else if
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
        if(fn == NaN){//handle any weird error
            displayError();
        }
        if(wholeFunc === "SyntaxError"){//this should let the division by zero error message stay displayed on the screen
            displayError();//might be better to return this function from the equals function division by zero section instead of repeating this code here
        }
        else if(wholeFunc === "ReallyBigNum"){//if a really big number is reached in the equals function it is better to return the
            displayBigNumber();//reallyBigNumber function to this location instead of repeating this code...maybe
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
            //equalsJustCalled = false;//if sym !== "="
            //insert display function(append to display "screen")
            //}
        }
    }
}

function determineNumberFill(num){
    if(equalsJustCalled == true){//if user presses number right after pressing equals it clears calc and starts new operation
        clearCalc();
        equalsJustCalled = false;
    }
    if(fnCheck == true){//if first number is finished being entered
        if((lastPress == "." && num == ".")|| (snDotCheck && num == ".")){//wont allow consecutive '.' presses
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
        if(wholeFunc === "SyntaxError"){//if theres an error dont let calculator add numbers on top of error messages
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

function equals(){
    equalsJustCalled = true;
    switch(op){
        case "+":
            fn = +fn + +sn;//unary operator to do addition
            sn = "";
            decimalOrBigNum();
            console.log(fn);//current to be displayed
            break;
        case "-":
            fn = fn - sn;
            sn = "";
            decimalOrBigNum();
            console.log(fn);//current to be displayed
            break;
        case "*":
            fn = fn * sn;
            sn = "";
            decimalOrBigNum();
            console.log(fn);//current to be displayed
            break;
        case "/":
            fn = fn / sn;
            if(sn == "0"){
                return displayError();
            }
            decimalOrBigNum();
            sn = "";
            console.log(fn);//current to be displayed
            break;
        case "^":
            fn = fn ** sn;
            sn = "";
            decimalOrBigNum();
            console.log(fn);//current to be displayed
            break;
    }
}

function isDecimal(num){
    return (num%1);
}

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

function clearCalc(){
    lastPress = "";//arithmetic func complete reset everything
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