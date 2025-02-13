import { db } from "./firebaseConfig.js";

window.onload = function () {
    let inputBox = document.getElementById('inputBox');
    let buttons = document.querySelectorAll('.button');

    const historyRef = db.ref("calculations");
    let expression = "";

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            let buttonValue = e.target.innerText;

            if (buttonValue === "AC") {
                expression = "";
                inputBox.value = "0";
            } 
            else if (buttonValue === "DEL") {
                expression = expression.slice(0, -1);
                inputBox.value = expression || "0";
            } 
            else if (buttonValue === "=") {
                try {
                    let result = eval(expression).toString();
                    saveToHistory(expression, result);
                    expression = result;
                    inputBox.value = expression;
                } catch {
                    saveToHistory(expression, "Error");
                    inputBox.value = "Error";
                    expression = "";
                }
            } 
            else {
                expression += buttonValue;
                inputBox.value = expression;
            }
        });
    });

    function saveToHistory(expression, result) {
        historyRef.push({
            expression: expression,
            result: result
        });
    }
};
