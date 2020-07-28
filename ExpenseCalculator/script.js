const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add transaction to array
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    return alert('Please add a text and amount');
  }

  const transaction = {
    id: generateId(),
    text: text.value.trim(),
    amount: +amount.value.trim(),
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
}

// Generate random Id
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

// Add Transactions To DOM List
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income, and expense
function updateValues() {
  const amounts = transactions.map((x) => x.amount);

  const total = amounts.reduce(sum, 0).toFixed(2);

  const income = amounts
    .filter((x) => x > 0)
    .reduce(sum, 0)
    .toFixed(2);

  const expense = (amounts.filter((x) => x < 0).reduce(sum, 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function sum(acc, item) {
  return acc + item;
}

// Remove Transaction By Id
function removeTransaction(id) {
  transactions = transactions.filter((x) => x.id !== id);
  init();
}

// Update Local Storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach((item) => addTransactionDOM(item));
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);

window.addEventListener('unload', updateLocalStorage);
