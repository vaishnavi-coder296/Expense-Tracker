const form = document.getElementById("form");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${transaction.desc} - ₹${transaction.amount}
            <button class="delete" onclick="deleteTransaction(${index})">
                X
            </button>
        `;

        list.appendChild(li);

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    income.textContent = totalIncome;
    expense.textContent = totalExpense;
    balance.textContent = totalIncome - totalExpense;

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const transaction = {
        desc: desc.value,
        amount: Number(amount.value),
        type: type.value
    };

    transactions.push(transaction);

    desc.value = "";
    amount.value = "";

    updateUI();
});

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();