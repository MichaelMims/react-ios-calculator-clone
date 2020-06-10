import React from 'react';
import Screen from "./components/screen/screen";
import Numpad from "./components/numpad/numpad";
import Operations from "./components/operations/operations";
import './App.css';

class App extends React.Component {

    state = {
        screenValue: "0",
        stillPerformingCalculations: true,
        outputQueue: [],
        operatorStack: [],
        clearScreen: false,
        allClear: "AC",
    };

    selectedAnOperationButton = false;

    // Function for Shunting-yard algorithm
    performOperations = () => {

        var operations = this.state.outputQueue;
        var outputQueue = [];
        var operatorStack = [];

        operations.forEach((token) => {
            if (!isNaN(token)) {
                outputQueue.push(token);
            } else {
                while (operatorStack > 0) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        });

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return this.solvePostFix(outputQueue);

    };

    // Solve the Post Fix Notation String
    solvePostFix = (postfix) => {
        var resultStack = [];
        for (var i = 0; i < postfix.length; i++) {

            if (!isNaN(postfix[i])) {
                resultStack.push(postfix[i]);
            } else {
                var a = resultStack.pop();
                var b = resultStack.pop();

                a = a % 1 !== 0 ?  parseFloat(a) : parseInt(a);
                b = b % 1 !== 0 ?  parseFloat(b) : parseInt(b);

                if (postfix[i] === "+") {
                    resultStack.push(a + b);
                } else if (postfix[i] === "-") {
                    resultStack.push(b - a);
                } else if (postfix[i] === "x") {
                    resultStack.push(a * b);
                } else if (postfix[i] === "÷") {
                    resultStack.push(b / a);
                }
            }
        }
        if (resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }
    };

    checkForError = () => {
        if (this.state.screenValue === "Error") {
            this.setState({screenValue: "0", lastValue: "", outputQueue: []});
            return true;
        }
        return false;
    };

    // onClick Handler for Numpad Component buttons
    onClickNumber = (e) => {
        e.preventDefault();

        this.checkForError();

        if ((this.state.screenValue.length < 6) || this.selectedAnOperationButton)  {
            this.selectedAnOperationButton = false;

            var currentScreenValue = this.state.screenValue;
            var valuePressed = e.currentTarget.value;
            var newValue = "";

            if (valuePressed === "C") {
                this.setState({screenValue: "0", allClear: "AC"});
                return;
            }

            if (valuePressed === "AC") {
                this.setState({screenValue: "0", lastValue: "", outputQueue: []});
                return;
            }

            if (valuePressed === "±") {
                this.setState({screenValue: (Math.abs(currentScreenValue) * -1)});
                return;
            }
            if (valuePressed === "%") {
                this.setState({screenValue: (currentScreenValue * .01)});
                return;
            }

            if (this.state.clearScreen) {
                this.setState({screenValue: "0", lastValue: "", clearScreen: false});
                currentScreenValue = "0";
            }

            if (currentScreenValue === "0") {
                if (valuePressed !== "0") {
                    this.setState({screenValue: valuePressed, allClear: "C"});
                }
            } else {
                newValue = currentScreenValue + valuePressed;
                this.setState({screenValue: newValue, allClear: "C"});

            }
        }
    };


    // onClick Handler for Operations component buttons
    onClickOperations = (e) => {
        e.preventDefault();

        if(this.checkForError())
            return;

        var currentScreenValue = this.state.screenValue;
        var currentOperationsList = this.state.outputQueue;

        this.selectedAnOperationButton = true;

        if (e.currentTarget.value === "=") {
            currentOperationsList.push.apply(currentOperationsList, [currentScreenValue]);
            var total = this.performOperations();

            if (total === Infinity) {
                total = "Error";
            }

            this.setState({
                screenValue: total,
                outputQueue: [],
                clearScreen: true,
            });
        } else {

            currentOperationsList.push.apply(currentOperationsList, [currentScreenValue, e.currentTarget.value]);
            this.setState({
                clearScreen: true,
                outputQueue: currentOperationsList,
            });
        }
    };

    render() {
        return (
            <div className="main-content">
                <div className="container vertical-center">
                    <div className="mainContent">
                        <div className="screenDiv">
                            <Screen value={this.state.screenValue} lastValue={this.state.lastValue}/>
                        </div>
                        <div className="keyPad">
                            <div className='numpadComponent'>
                                <Numpad allClearValue={this.state.allClear} onClick={this.onClickNumber}/>
                            </div>
                            <div className="operationsComponent">
                                <Operations onClick={this.onClickOperations}/>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        );
    }
}

export default App;
