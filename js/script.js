let fn = "";
let sn = "";
let op = "";
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
            console.log(e.target.dataset.value);
            //checkIfNum(e.target.dataset.value);
            if(!isNaN(e.target.dataset.value)){//check if it is a number that is being clicked
                console.log("its a number");
                // here i will determine if firstNumber(fn) or secondNumber(sn) needs to be filled
                determineNumberFill(e.target.dataset.value);
            }
            else{
                console.log("its a symbol");
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
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "-":
            fn = fn - sn;
            sn = "";
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "*":
            fn = fn * sn;
            sn = "";
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "/":
            fn = fn / sn;
            sn = "";
            //display fn as current and append to full arithFunc to display on top left
            break;
        case "c":
            clearCalc();
            //clearDisplay();
            break;
    }
}

function clearCalc(){
    lastPress = "";//arithmetic func complete reset everything
    fnCheck = false;
    op = "";
    fn = "";
    sn = "";
}

function determineSymbolFill(sym){
    if(op === "" && !isNaN(lastPress)){//first time symbol is pressed
        op = sym;
        fnCheck = true;
        lastPress = "sym";
        //insert display function(append to display "screen")
    }
    else if(op && !isNaN(lastPress)){//chained operation eg 1+2*3-4/5
        if(op === "="){
            equals();
            clearCalc();
            //display full arithmetic function with result
        }
        else{
            equals();
            op = sym;
            fnCheck = true;
            lastPress = "sym";
            //insert display function(append to display "screen")
        }
    }
}

function determineNumberFill(num){
    if(fnCheck == true){
        sn += num.toString();
        lastPress = num;
    }
    else{
        fn += num.toString();
        lastPress = num;
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