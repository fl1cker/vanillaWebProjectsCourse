const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check required fields
function checkRequired(inputElements) {
  inputElements.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    }
  });
}

// Check Min and Max length
function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${minLength} characters`
    );
  } else if (input.value.length > maxLength) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${maxLength} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check Passwords Match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else {
    showSuccess(input2);
  }
}

// Get fieldname
function getFieldName(input) {
  const name = input.id;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is invalid`);
  }

  return re.test(String(email).toLowerCase());
}

//Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
