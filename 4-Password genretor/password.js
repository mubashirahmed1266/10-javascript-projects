// ===== DOM ELEMENT SELECTION =====

// Password Display
const passwordOutput = document.getElementById("passwordOutput");

// Buttons
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

// Password Length
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");

// Character Options
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

// Password Strength
const strengthText = document.getElementById("strengthText");
const strengthProgress = document.getElementById("strengthProgress");

// Live Password Checker
const testPassword = document.getElementById("testPassword");

// Password Requirements
const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const symbolCheck = document.getElementById("symbolCheck");

// ===== CHARACTER SETS =====

const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

// ===== GET SELECTED CHARACTERS =====

function getSelectedCharacters() {

    let characters = "";

    if (uppercase.checked) {
        characters += characterSets.uppercase;
    }

    if (lowercase.checked) {
        characters += characterSets.lowercase;
    }

    if (numbers.checked) {
        characters += characterSets.numbers;
    }

    if (symbols.checked) {
        characters += characterSets.symbols;
    }

    return characters;
}

// ===== SECURE RANDOM CHARACTER =====

function getRandomCharacter(characters) {

    const randomValues = new Uint32Array(1);

    const maxValidValue = Math.floor(
        4294967296 / characters.length
    ) * characters.length;

    let randomNumber;

    do {
        crypto.getRandomValues(randomValues);
        randomNumber = randomValues[0];

    } while (randomNumber >= maxValidValue);

    return characters[randomNumber % characters.length];
}

// ===== GENERATE PASSWORD =====

function generatePassword() {

    const selectedSets = [];

    if (uppercase.checked) {
        selectedSets.push(characterSets.uppercase);
    }

    if (lowercase.checked) {
        selectedSets.push(characterSets.lowercase);
    }

    if (numbers.checked) {
        selectedSets.push(characterSets.numbers);
    }

    if (symbols.checked) {
        selectedSets.push(characterSets.symbols);
    }

    if (selectedSets.length === 0) {
        alert("Please select at least one character type!");
        return;
    }

    const length = Number(passwordLength.value);

    let password = "";

    // One character from each selected category

    selectedSets.forEach(function (set) {
        password += getRandomCharacter(set);
    });

    // Combine selected character sets

    const allCharacters = selectedSets.join("");

    // Fill remaining password length

    while (password.length < length) {
        password += getRandomCharacter(allCharacters);
    }

    // Shuffle password

    password = shufflePassword(password);

    // Display password

    passwordOutput.value = password;
}

// ===== GENERATE BUTTON EVENT =====

generateBtn.addEventListener("click", generatePassword);

// ===== SECURE RANDOM INDEX =====

function getSecureRandomIndex(max) {

    const randomValues = new Uint32Array(1);

    const maxValidValue = Math.floor(
        4294967296 / max
    ) * max;

    let randomNumber;

    do {
        crypto.getRandomValues(randomValues);
        randomNumber = randomValues[0];

    } while (randomNumber >= maxValidValue);

    return randomNumber % max;
}

// ===== SHUFFLE PASSWORD =====

function shufflePassword(password) {

    const characters = password.split("");

    for (let i = characters.length - 1; i > 0; i--) {

        const randomIndex = getSecureRandomIndex(i + 1);

        [characters[i], characters[randomIndex]] =
        [characters[randomIndex], characters[i]];

    }

    return characters.join("");
}

// ===== COPY PASSWORD =====

async function copyPassword() {

    const password = passwordOutput.value;

    if (password === "") {
        alert("Please generate a password first!");
        return;
    }

    try {

        await navigator.clipboard.writeText(password);

        copyBtn.textContent = "Copied!";

        setTimeout(function () {

            copyBtn.textContent = "Copy";

        }, 2000);

    } catch (error) {

        alert("Unable to copy password. Please copy it manually.");

    }
}

copyBtn.addEventListener("click", copyPassword);

// ===== PASSWORD STRENGTH CHECKER =====

function updatePasswordStrength(password) {

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    const percentage = (score / 6) * 100;

    strengthProgress.style.width = percentage + "%";

    if (score <= 2) {

        strengthText.textContent = "Weak";
        strengthProgress.style.backgroundColor = "red";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";
        strengthProgress.style.backgroundColor = "orange";

    } else {

        strengthText.textContent = "Strong";
        strengthProgress.style.backgroundColor = "green";

    }
}


// ===== GENERATE BUTTON STRENGTH EVENT =====

generateBtn.addEventListener("click", function() {

    if (getSelectedCharacters().length > 0 && passwordOutput.value !== "") {

        updatePasswordStrength(passwordOutput.value);

    }

});

// ===== LIVE PASSWORD CHECKER =====

function checkPasswordRequirements() {

    const password = testPassword.value;

    const hasLength = password.length >= 8;

    const hasUppercase = /[A-Z]/.test(password);

    const hasLowercase = /[a-z]/.test(password);

    const hasNumber = /[0-9]/.test(password);

    const hasSymbol = /[^A-Za-z0-9]/.test(password);


    updateRequirement(lengthCheck, hasLength);

    updateRequirement(uppercaseCheck, hasUppercase);

    updateRequirement(lowercaseCheck, hasLowercase);

    updateRequirement(numberCheck, hasNumber);

    updateRequirement(symbolCheck, hasSymbol);

}


// ===== UPDATE REQUIREMENT =====

function updateRequirement(element, isValid) {

    element.classList.toggle("valid", isValid);

    const icon = element.querySelector(".check-icon");

    icon.textContent = isValid ? "✔" : "✖";

}


// ===== PASSWORD INPUT EVENT =====

testPassword.addEventListener("input", checkPasswordRequirements);

// ===== PASSWORD LENGTH SLIDER =====

passwordLength.addEventListener("input", function() {

    lengthValue.textContent = passwordLength.value;

});


// ===== INITIAL PASSWORD LENGTH =====

lengthValue.textContent = passwordLength.value;