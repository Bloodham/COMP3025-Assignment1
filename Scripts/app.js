/*
Ryan Jameson
Assignment 1
COMP3068
app.js file that holds variables and functions
January 21st, 2017
*/

$(document).on("pagecreate", "#calculator", function() {

    //Makes display field a read only in both views
    $(".displayControl").prop("readonly", true);

    //variables used for the calculator
    var display = $(".displayControl");
    display.val("0");
    var operator;
    var operatorSet = false;
    var equalsPressed = false;
    var accumulator = null;

    //Detects which button is pressed
    $("button").on("tap",function() {
        var buttonID = $(this).attr("id");

        //Switch statement to tell which button is pressed and shows within the textbox
        switch(buttonID){
        case "key0":
            enterOperand(0);
            break;
        case "key1":
            enterOperand(1);
            break;
        case "key2":
            enterOperand(2);
            break;
        case "key3":
            enterOperand(3);
            break;
        case "key4":
            enterOperand(4);
            break;
        case "key5":
            enterOperand(5);
            break;
        case "key6":
            enterOperand(6);
            break;
        case "key7":
            enterOperand(7);
            break;
        case "key8":
            enterOperand(8);
            break;
        case "key9":
            enterOperand(9);
            break;
        case "keyEquals":
            setOperator("=");
            break;
        case "keyDivide":
            setOperator("/");
            break;
        case "keyMultiply":
            setOperator("*");
            break;
        case "keyAdd":
            setOperator("+");
            break;
        case "keySubtract":
            setOperator("-");
            break;
        case "keyClear":
            clearDisplay();
            break;
        case "keyDel":
            deleteOperand();
            break;
        case "keyDecimalPoint":
            enterOperand(".");
            break;
        case "keySquareRoot":
            getSquareRoot();
            break;
        case "keyPlusMinus":
            plusMinusSwitch();
            break;
        }
    });
        //adds two numbers by each other
    addition = function(accumulatorOperand, currentOperand) {
        return (accumulatorOperand + currentOperand);
    };
       //subtracts two mumbers by each other
    subtraction = function(accumulatorOperand, currentOperand) {
        return (accumulatorOperand - currentOperand);
    };
    //Multiplies two numbers by each other
    multiplication = function(accumulatorOperand, currentOperand) {
        return (accumulatorOperand * currentOperand);
    };
    //divides two numbers by each other
    division = function(accumulatorOperand, currentOperand) {
        if (currentOperand == 0) {
            return 0;
        }
        return (accumulatorOperand / currentOperand);
    };
    //gets the squareroot
    getSquareRoot = function() {
        displayValue = parseFloat(getDisplayValue())
        setDisplayValue(Number(Math.sqrt(parseFloat(getDisplayValue())).toFixed(5)));
    };
    //Changes the number between negative to positive
    plusMinusSwitch = function() {
        displayValue = parseFloat(getDisplayValue());
        if(displayValue > 0){
            setDisplayValue("-" + displayValue.toString());
        }
        else{
            setDisplayValue(displayValue.toString().replace("-", ""));
        }
    };
    //Function does the operations depending on the number
    calculate = function() {
        //if no operators have been entered, don't finish the function
        if(accumulator == null || !operator) {
            return;
        }
        //gets the calculator displays value
        var currentNumber = parseFloat(getDisplayValue());
        newDisplayValue = 0;

        //switch statement to call the correct function
        switch (operator) {
        case "/":
            newDisplayValue = division(accumulator, currentNumber);
            break;
        case "*":
            newDisplayValue = multiplication(accumulator, currentNumber);
            break;
        case "+":
            newDisplayValue = addition(accumulator, currentNumber);
            break;
        case "-":
            newDisplayValue = subtraction(accumulator, currentNumber);
            break;
        }

        //rounds numbers decimal to 5 places
        newDisplayValue = Number(newDisplayValue.toFixed(5));
        //if the number is inside of the storable range print to display, else throw error
        if(newDisplayValue < 8502819402850572 && newDisplayValue > -8502819402850572){
            //if the number is small enough to properly show on the display, print to display, else throw error
            if(newDisplayValue.toString().length <= 14){
                //setting the display's value to the new value
                setDisplayValue(newDisplayValue);
                //adding display value to the accumulator
                accumulator = newDisplayValue;
            }
            else{
                setDisplayValue(accumulator);
            }
        }
        else{
            setDisplayValue(accumulator);
        }
    };
    //function changes the value shown
    setDisplayValue = function(value) {
        display.val(value);
    };

    //function grabs the value labeled in the display
    getDisplayValue = function() {
        return display.val() + "";
    };
    //function clears the display and resets values
    clearDisplay = function() {
        accumulator = null;
        operatorSet = false;
        equalsPressed = false;
    
        setDisplayValue("0");
    };
    //function removes the last number in the display
    deleteOperand = function() {
        var displayValue = getDisplayValue();

        //if there is a number, remove it and set new
        if(displayValue){
            displayValue = displayValue.slice(0, displayValue.length - 1);
            displayValue = displayValue ? displayValue: "0";

            setDisplayValue(displayValue);
        }
    };
    //function handles the number and button presses
    enterOperand = function(buttonValue) {
        //if a new number is set, or if the display is 0, the display is set to the number that is pushed
        if(operatorSet == true || getDisplayValue() == "0" && buttonValue != "."){
            setDisplayValue(buttonValue);
            operatorSet = false;
        }
        
        else{
            //makes sure that the current value shown is greater than the max display number. 
            if(getDisplayValue().toString().length + 1 > 14){
            }
            else{
                //check if . already exists in the current display value
                if(buttonValue == "." && getDisplayValue().toString().indexOf(".") != -1){
                    return 0;
                }
                else{
                    setDisplayValue(getDisplayValue() + buttonValue);
                }  
            }
        }
    };
    //function handles the button presses
    setOperator = function(operatorValue) {
        if(operatorValue === "="){
            equalsPressed = true;
            calculate();
            return;
    }
        if(!equalsPressed) calculate();
            equalsPressed = false;
            operator = operatorValue;
            operatorSet = true;
            accumulator = parseFloat(getDisplayValue());
    };
});