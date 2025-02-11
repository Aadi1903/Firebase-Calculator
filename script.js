require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
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