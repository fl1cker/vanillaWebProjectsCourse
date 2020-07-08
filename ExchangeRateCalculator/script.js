const currencyEl_one = document.getElementById('currency-1');
const currencyEl_two = document.getElementById('currency-2');
const amountEl_one = document.getElementById('amount-1');
const amountEl_two = document.getElementById('amount-2');
const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');

// Fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

// Event Listeners

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

calculate();
