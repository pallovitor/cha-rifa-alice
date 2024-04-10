// IMPORTANDO  MODULOS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, arrayUnion, increment } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyC2b9ODJXriEJYkR4audr611PlYFXZuFKE",
    authDomain: "cha-rifa-da-alice.firebaseapp.com",
    projectId: "cha-rifa-da-alice",
    storageBucket: "cha-rifa-da-alice.appspot.com",
    messagingSenderId: "1005804935672",
    appId: "1:1005804935672:web:dbb172394743cfe6649e0d"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let firebaseData;

const querySnapshot = await getDocs(collection(db, "rifa"));
querySnapshot.forEach((doc) => {
    firebaseData = doc.data().backuNbers;

});
console.log(firebaseData);

const numberContainer = document.getElementById("number-container");
const submitBtn = document.getElementById("submit-btn");
const form = document.querySelector(".ticket-form-send")
const valor = document.getElementById("valor");
const mascara = document.querySelector(".mascara-formulario")
const tFralda = document.querySelector(".fraldas");
let fraldas = document.querySelector('#fraldas-check')
let pix = document.querySelector('#pix-check')

let selectedNumbers = [];
let totalValue = 0;
let backumbers = firebaseData
var t = ""
let cont = 0
var numberSelector

function esconde() {
    mascara.style = "z-index: 3"
    mascara.style.visibility = "visible"
}



(async () => {
    function generateNumberBoxes() {
        for (let i = 1; i <= 80; i++) {
            const numberBox = document.createElement("div");
            numberBox.classList.add("number-box");
            numberBox.textContent = i;
            numberBox.addEventListener("click", () => {
                numberBox.classList.toggle("selected");
                if (numberBox.classList.contains("selected")) {
                    selectedNumbers.push(i);
                    totalValue = 35 * selectedNumbers.length
                    cont++
                    numberSelector = selectedNumbers[cont - 1]
                    valor.innerHTML = totalValue

                } else {
                    const index = selectedNumbers.indexOf(i);
                    selectedNumbers.splice(index, 1);
                    cont--
                    totalValue = 35 * selectedNumbers.length
                    numberSelector = selectedNumbers[cont - 1]
                    valor.innerHTML = totalValue
                }

                submitBtn.disabled = selectedNumbers.length < 1;

                console.log(numberSelector)

                if (numberSelector === undefined) {
                    t = ""
                    tFralda.innerHTML = "?"
                }
                if (numberSelector < 10) {
                    tFralda.innerHTML = "P"
                    t = "P"
                }
                if (numberSelector > 10 && numberSelector <= 50) {
                    tFralda.innerHTML = "M"
                    t = "M"
                } if (numberSelector > 50 && numberSelector <= 80) {
                    t = "G"
                    tFralda.innerHTML = "G"
                }
            });

            if (backumbers.includes(i)) {
                numberBox.setAttribute('onclick', 'return false');
                numberBox.style.pointerEvents = 'none';
                // numberBox.removeChild(numberBox.firstChild)
                numberBox.classList.add("selected");
                numberBox.style.background = `url("./assets/pé.png")`
                numberBox.style.color = "#ffffff00";
                numberBox.style.backgroundSize = "cover"
            }
            numberContainer.appendChild(numberBox);
        }
    }

    function showForm() {
        const number = document.getElementById("selectedNumbers");
        const forma = document.getElementById("forma")
        let numqt = document.getElementById("qt-num")
        let vaLor = document.getElementById("vaLor")
        number.value = selectedNumbers
        pix.checked ? forma.value = "PIX" : forma.value = "FRALDA"
        numqt.value = selectedNumbers.length
        if (forma.value === "PIX") {
            vaLor.value = totalValue
        } else {
            vaLor.value = ""

        }
        console.log(vaLor.value)


        const messageTextArea = document.getElementById("dados");
        if (selectedNumbers.length === 0) {
            alert("Por favor, escolha pelo menos um numero!")
        } else if ((!pix.checked && !fraldas.checked)) {
            alert("Por favor escolha entre  PIX ou Fralda!");

        } else if (pix.checked && selectedNumbers.length > 1) {
            form.style.left = "50%"
            form.style.transform = "translateX(-50%)"
            mascara.style.visibility = "visible"
            messageTextArea.innerHTML = `Muito obrigado por participar!\nSeus números são: ${selectedNumbers}.\nNos e a Alice desejamos boa sorte!\nPIX: pallo.vittor@gmail.com\nValor do pix:${totalValue}\nPAULO VITOR DE ARAUJO SILVA`

        } else if (pix.checked && selectedNumbers.length === 1) {
            form.style.left = "50%"
            form.style.transform = "translateX(-50%)"
            mascara.style.visibility = "visible"
            messageTextArea.innerHTML = `Muito obrigado por participar!\nSeu número é: ${selectedNumbers}.\nNos e a Alice desejamos boa sorte!\nPIX: pallo.vittor@gmail.com\nValor do pix:${totalValue}\nPAULO VITOR DE ARAUJO SILVA`
        } else if (fraldas.checked && selectedNumbers.length === 1) {
            form.style.left = "50%"
            form.style.transform = "translateX(-50%)"
            mascara.style.visibility = "visible"
            messageTextArea.innerHTML = `Muito obrigado por participar!\nSeu número é: ${selectedNumbers}.\nPor tanto o tamanho da fralda é: "${t}."\nNos e a Alice desejamos boa sorte!`

        } else {
            form.style.left = "50%"
            form.style.transform = "translateX(-50%)"
            mascara.style.visibility = "visible"
            messageTextArea.innerHTML = `Muito obrigado por participar!\nSeus números são: ${selectedNumbers}.\nPor tanto o tamanho da fralda é: "${t}."\nNos e a Alice desejamos boa sorte!`

        }




    }



    function cliqueimascara() {
        form.style.left = "-300px"
        form.style.transform = "translateX(0)"
        mascara.style.visibility = "hidden"
        window.location.reload()
    }

    async function submitTicket() {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("tel");

        if (nameInput.value === "" || emailInput.value === "") {
            alert("Por favor, preencha todos os campos do formulário.");
            return;
        }

        // Process the form data here
        console.log("Name: " + nameInput.value);
        console.log("Tel: " + emailInput.value);
        console.log("Selected Numbers: " + selectedNumbers);

    }

    const formu = document.querySelector("form");

    const form = document.querySelector(".ticket-form-send");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    async function handleSubmit() {
        esconde()

        const backuNberss = doc(db, "rifa", "2PDOY71RmsyixT4Cfu6i");

        await updateDoc(backuNberss, {

            backuNbers: arrayUnion(...selectedNumbers)

        });
        console.log(selectedNumbers)
        submitForm();

    }

    async function submitForm() {
        const nameInput = document.getElementById("name")
        if (pix.checked && selectedNumbers.length > 1) {
            window.location.href = `https://api.whatsapp.com/send?phone=5511948798047&text=*%23Ch%C3%A1%20rifa%20da%20Alice*%0A*Nome%20%3A*%20${nameInput.value}%0A*PIX%3A*%20${totalValue}%0A*_OLÁ, QUERO PARTICIPAR DA RIFA DESSA PRINCESA, E EU ESCOLHI OS NÚMEROS:_* ${selectedNumbers}%0A🥰🤞🙌%0A`;


        } else if (pix.checked && selectedNumbers.length === 1) {
            window.location.href = `https://api.whatsapp.com/send?phone=5511948798047&text=*%23Ch%C3%A1%20rifa%20da%20Alice*%0A*Nome%20%3A*%20${nameInput.value}%0A*PIX%3A*%20${totalValue}%0A*_OLÁ, QUERO PARTICIPAR DA RIFA DESSA PRINCESA, E EU ESCOLHI O NÚMERO:_* ${selectedNumbers}%0A🥰🤞🙌%0A`;
        } else if (fraldas.checked && selectedNumbers.length === 1) {

            window.location.href = `https://api.whatsapp.com/send?phone=5511948798047&text=**Ch%C3%A1%20rifa%20da%20Alice*%0A*Nome%20%3A*%20${nameInput.value}%0A*Fralda%3A*%20${t}%0A*_OLÁ, QUERO PARTICIPAR DA RIFA DESSA PRINCESA, E EU ESCOLHI O NÚMERO:_* ${selectedNumbers}%0A🥰🤞🙌%0A`;

        } else {
            window.location.href = `https://api.whatsapp.com/send?phone=5511948798047&text=**Ch%C3%A1%20rifa%20da%20Alice*%0A*Nome%20%3A*%20${nameInput.value}%0A*Fralda%3A*%20${t}%0A*_OLÁ, QUERO PARTICIPAR DA RIFA DESSA PRINCESA, E EU ESCOLHI OS NÚMEROS:_* ${selectedNumbers}%0A🥰🤞🙌%0A`;

        }

    }

    document.getElementById('ticket-form').addEventListener('submit', function (event) {

        event.preventDefault();
        var formData = new FormData(this);
        fetch(this.action, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);
                handleSubmit()
            })
            .catch(error => {

                console.error(error);
            });
    });

    document.querySelector('.big-button').addEventListener('click', showForm);
    document.querySelector('.mascara-formulario').addEventListener('click', cliqueimascara);
    generateNumberBoxes();
    submitBtn.addEventListener("click", submitTicket);
})();
