// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXxi4Uy-OLW8r2FzCU_PZdIk1b5mDAjkE",
    authDomain: "calculator-54c42.firebaseapp.com",
    databaseURL: "https://calculator-54c42-default-rtdb.firebaseio.com",
    projectId: "calculator-54c42",
    storageBucket: "calculator-54c42.appspot.com",
    messagingSenderId: "310160878286",
    appId: "1:310160878286:web:7100e62503a0cdae1ffe9f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('.button'); // Select buttons

let string = "";

const historyRef = db.ref('calculations');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnValue = e.target.innerText;

        if (btnValue === '=') {
            try {
                if (string.includes('/0')) {
                    input.value = "Math Error";

                    db.ref('calculations').push({
                        expression: string,
                        result: "Math Error"
                    });

                } else {
                    let result = eval(string);
                    input.value = result;

                    // Store expression in Firebase
                    historyRef.push({ expression: `${string} = ${result}` });

                    string = result.toString(); // Update input for further calculations
                }
            } catch (error) {
                input.value = "Error";
            }
        } 
        else if (btnValue === 'AC') {
            string = "";
            input.value = string;
        } 
        else if (btnValue === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } 
        else {
            let lastChar = string[string.length - 1];
            let operators = ['+', '-', '*', '/', '%'];

            if (operators.includes(btnValue) && operators.includes(lastChar)) {
                return;
            }
            string += btnValue;
            input.value = string;
        }
    });
});