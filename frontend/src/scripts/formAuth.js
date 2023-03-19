const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", e => {
  e.preventDefault();

  inputsCheck();
  successMessage();
});

const inputsCheck = () => {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (firstNameValue === "") {
    setError(firstName, "First name cannot be blank");
  } else {
    setSuccess(firstName);
  }

  if (lastNameValue === "") {
    setError(lastName, "Last name cannot be blank");
  } else {
    setSuccess(lastName);
  }

  if (emailValue === "") {
    setError(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setError(email, "Email is not valid");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password cannot be blank");
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Password cannot be blank");
  } else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPassword, "Passwords do not match");
  } else {
    setSuccess(confirmPassword);
  }
};

const setError = (input, message) => {
  const inputWrapper = input.parentElement; 
  const small = inputWrapper.querySelector("small");
  small.innerText = message;
  inputWrapper.classList.add("error");
};

const setSuccess = input => {
  const inputWrapper = input.parentElement;
  inputWrapper.classList.remove("error");
  inputWrapper.classList.add("success");
};

const isEmail = email => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const successMessage = () => {
  const inputWrapper = document.querySelectorAll(".input-wrapper");
  let success = 0;
  for (i = 0; i < inputWrapper.length; i++) {
    let formIterate = inputWrapper;
    let check = formIterate[i].classList.contains("success");
    if (check !== true) {
      success++;
      break;
    }
  }
  if (success === 1) {
    return;
  } else {
    setTimeout(() => {
      showAlert();
    }, 1000);
  }
};

const showAlert = () => {
  const myAlert = `
<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
   <strong>You have successfully placed your order!</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
 `;

  document.getElementById("alerts").innerHTML = myAlert;
  window.scrollTo(0, 0);
};
