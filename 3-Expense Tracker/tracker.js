// Selecting HTML Elements

const expenseForm = document.querySelector("#expense-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const typeInput = document.querySelector("#type");
const dateInput = document.querySelector("#date");

const transactionList = document.querySelector("#transaction-list");

// Transactions Array
let transactions = [];

// Form Submit Event
expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const type = typeInput.value;
    const date = dateInput.value;

    if (!description || amount <= 0 || !category || !date) {
        alert("Please enter valid transaction details!");
        return;
    }

    // Creating Transaction Object
    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        type,
        date
    };

    // Add Transaction
    transactions.push(transaction);

    saveTransactions();
    displayTransaction(transaction);
    updateSummary();

    expenseForm.reset();

});

// Display Transaction Function
function displayTransaction(transaction) {

    const li = document.createElement("li");

    li.dataset.id = transaction.id;

    const details = document.createElement("span");

    details.textContent =
        `${transaction.description} | ${transaction.category} | ${transaction.date}`;

    const amount = document.createElement("strong");

    amount.textContent =
        `${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    li.append(details, amount, deleteButton);

    transactionList.appendChild(li);

}

// Update Financial Summary
function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        }
        else if (transaction.type === "expense") {
            totalExpense += transaction.amount;
        }

    });

    const totalBalance = totalIncome - totalExpense;

    document.querySelector("#total-income").textContent =
        `$${totalIncome.toFixed(2)}`;

    document.querySelector("#total-expense").textContent =
        `$${totalExpense.toFixed(2)}`;

    document.querySelector("#total-balance").textContent =
        `$${totalBalance.toFixed(2)}`;

}

// Save Transactions
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// Load Transactions
function loadTransactions() {

    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {

        transactions = JSON.parse(savedTransactions);

        transactions.forEach(function (transaction) {
            displayTransaction(transaction);
        });

    }

    updateSummary();

}

// Delete Transaction
transactionList.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-btn")) {

        const li = e.target.closest("li");

        const id = Number(li.dataset.id);

        transactions = transactions.filter(function (transaction) {
            return transaction.id !== id;
        });

        saveTransactions();

        li.remove();

        updateSummary();

    }

});

// Load Saved Data
loadTransactions();
