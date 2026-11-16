// 1. Selecting HTML Elements

const registrationForm = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const successMessage = document.getElementById("successMessage");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");


// 2. Error Handling Functions

function showError(input, errorElement, message) {

    errorElement.textContent = message;
    input.style.borderColor = "#ef4444";

}

function showSuccess(input, errorElement) {

    errorElement.textContent = "";
    input.style.borderColor = "#22c55e";

}


// 3. Full Name Validation

function validateName() {

    const nameValue = fullName.value.trim();

    const namePattern = /^[\p{L}][\p{L}\s'-]{2,}$/u;

    if (nameValue === "") {

        showError(fullName, nameError, "Full name is required.");
        return false;

    }

    if (!namePattern.test(nameValue)) {

        showError(fullName, nameError, "Please enter a valid name (minimum 3 characters).");
        return false;

    }

    showSuccess(fullName, nameError);
    return true;

}


// 4. Email Validation

function validateEmail() {

    const emailValue = email.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {

        showError(email, emailError, "Email address is required.");
        return false;

    }

    if (!emailPattern.test(emailValue)) {

        showError(email, emailError, "Please enter a valid email address.");
        return false;

    }

    showSuccess(email, emailError);
    return true;

}


// 5. Phone Number Validation

function validatePhone() {

    const phoneValue = phone.value.trim();

    const phonePattern = /^\+?[0-9\s()-]{10,20}$/;

    const digitCount = phoneValue.replace(/\D/g, "").length;

    if (phoneValue === "") {

        showError(phone, phoneError, "Phone number is required.");
        return false;

    }

    if (!phonePattern.test(phoneValue) || digitCount < 10 || digitCount > 15) {

        showError(phone, phoneError, "Please enter a valid phone number.");
        return false;

    }

    showSuccess(phone, phoneError);
    return true;

}


// 6. Password Strength Checker

function checkPasswordStrength() {

    const passwordValue = password.value;

    let strength = 0;

    if (passwordValue.length >= 8) strength++;

    if (/[A-Z]/.test(passwordValue)) strength++;

    if (/[a-z]/.test(passwordValue)) strength++;

    if (/[0-9]/.test(passwordValue)) strength++;

    if (/[^A-Za-z0-9]/.test(passwordValue)) strength++;


    if (passwordValue.length === 0) {

        strengthBar.style.width = "0%";
        strengthBar.style.background = "#293247";

        strengthText.textContent = "Password Strength";
        strengthText.style.color = "#9ca3af";

    }

    else if (strength <= 2) {

        strengthBar.style.width = "25%";
        strengthBar.style.background = "#ef4444";

        strengthText.textContent = "Weak Password";
        strengthText.style.color = "#ef4444";

    }

    else if (strength === 3) {

        strengthBar.style.width = "60%";
        strengthBar.style.background = "#f59e0b";

        strengthText.textContent = "Medium Password";
        strengthText.style.color = "#f59e0b";

    }

    else if (strength === 4) {

        strengthBar.style.width = "80%";
        strengthBar.style.background = "#3b82f6";

        strengthText.textContent = "Good Password";
        strengthText.style.color = "#3b82f6";

    }

    else {

        strengthBar.style.width = "100%";
        strengthBar.style.background = "#22c55e";

        strengthText.textContent = "Strong Password";
        strengthText.style.color = "#22c55e";

    }

    return strength;

}


// 7. Password Validation

function validatePassword() {

    const passwordValue = password.value;

    const strength = checkPasswordStrength();

    if (passwordValue === "") {

        showError(password, passwordError, "Password is required.");
        return false;

    }

    if (passwordValue.length < 8) {

        showError(password, passwordError, "Password must contain at least 8 characters.");
        return false;

    }

    if (strength < 5) {

        showError(password, passwordError, "Use uppercase, lowercase, numbers and symbols.");
        return false;

    }

    showSuccess(password, passwordError);
    return true;

}


// 8. Confirm Password Validation

function validateConfirmPassword() {

    const confirmValue = confirmPassword.value;

    if (confirmValue === "") {

        showError(confirmPassword, confirmPasswordError, "Please confirm your password.");
        return false;

    }

    if (confirmValue !== password.value) {

        showError(confirmPassword, confirmPasswordError, "Passwords do not match.");
        return false;

    }

    showSuccess(confirmPassword, confirmPasswordError);
    return true;

}


// 9. Terms & Conditions Validation

function validateTerms() {

    if (!terms.checked) {

        termsError.textContent = "Please accept Terms & Conditions.";
        return false;

    }

    termsError.textContent = "";
    return true;

}


// 10. Show / Hide Password

togglePassword.addEventListener("click", function() {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "Hide";

    }

    else {

        password.type = "password";
        togglePassword.textContent = "Show";

    }

});


toggleConfirmPassword.addEventListener("click", function() {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        toggleConfirmPassword.textContent = "Hide";

    }

    else {

        confirmPassword.type = "password";
        toggleConfirmPassword.textContent = "Show";

    }

});


// 11. Real-Time Validation

fullName.addEventListener("input", validateName);

email.addEventListener("input", validateEmail);

phone.addEventListener("input", validatePhone);

password.addEventListener("input", function() {

    validatePassword();

    if (confirmPassword.value !== "") {

        validateConfirmPassword();

    }

});

confirmPassword.addEventListener("input", validateConfirmPassword);

terms.addEventListener("change", validateTerms);


// 12. Reset Form State

function resetFormState() {

    registrationForm.reset();

    const inputs = [
        fullName,
        email,
        phone,
        password,
        confirmPassword
    ];

    inputs.forEach(function(input) {

        input.value = "";
        input.style.borderColor = "#2b354a";

    });

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";

    strengthBar.style.width = "0%";
    strengthBar.style.background = "#293247";

    strengthText.textContent = "Password Strength";
    strengthText.style.color = "#9ca3af";

    password.type = "password";
    confirmPassword.type = "password";

    togglePassword.textContent = "Show";
    toggleConfirmPassword.textContent = "Show";

}


// 13. Form Submission

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    successMessage.style.display = "none";

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const areTermsAccepted = validateTerms();


    if (
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        areTermsAccepted
    ) {

        successMessage.textContent =
            "Congratulations! Your account has been created successfully.";

        successMessage.style.display = "block";

        resetFormState();

        // Clear Browser Autofill After Submission

        requestAnimationFrame(function() {

            email.value = "";
            password.value = "";
            confirmPassword.value = "";

            checkPasswordStrength();

        });

    }

});