let expression = "";

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

function appendValue(value) {
    expression += value;
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = "0";
}

function clearCalculator() {
    expression = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "0";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    expressionDisplay.textContent = expression;
}

function scientific(type) {

    if (expression === "") {
        return;
    }

    let value = parseFloat(expression);
    let result;

    switch (type) {

        case "sin":
            result = Math.sin(value * Math.PI / 180);
            break;

        case "cos":
            result = Math.cos(value * Math.PI / 180);
            break;

        case "tan":
            result = Math.tan(value * Math.PI / 180);
            break;

        case "sqrt":
            if (value < 0) {
                resultDisplay.textContent = "Error";
                return;
            }
            result = Math.sqrt(value);
            break;

        case "log":
            if (value <= 0) {
                resultDisplay.textContent = "Error";
                return;
            }
            result = Math.log10(value);
            break;

        case "ln":
            if (value <= 0) {
                resultDisplay.textContent = "Error";
                return;
            }
            result = Math.log(value);
            break;

        case "square":
            result = Math.pow(value, 2);
            break;

        case "cube":
            result = Math.pow(value, 3);
            break;

        case "power":
            expression += "^";
            expressionDisplay.textContent = expression;
            return;

        case "factorial":
            if (value < 0 || !Number.isInteger(value)) {
                resultDisplay.textContent = "Error";
                return;
            }

            result = factorial(value);
            break;
    }

    expressionDisplay.textContent = expression;
    resultDisplay.textContent = formatResult(result);
}

function factorial(number) {

    let result = 1;

    for (let i = 2; i <= number; i++) {
        result *= i;
    }

    return result;
}

function calculate() {

    if (expression === "") {
        return;
    }

    try {

        let calculation = expression
            .replace(/π/g, "Math.PI")
            .replace(/\be\b/g, "Math.E")
            .replace(/\^/g, "**");

        let result = Function("return " + calculation)();

        if (!Number.isFinite(result)) {
            throw new Error();
        }

        resultDisplay.textContent = formatResult(result);

    } catch (error) {

        resultDisplay.textContent = "Error";
    }
}

function formatResult(value) {

    if (Number.isInteger(value)) {
        return value;
    }

    return Number(value.toFixed(10));
}


// Keyboard Support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        !isNaN(key) ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "(" ||
        key === ")"
    ) {
        appendValue(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearCalculator();
    }
});