const form=document.getElementById("form"),firstName=document.getElementById("first-name"),lastName=document.getElementById("last-name"),email=document.getElementById("email"),password=document.getElementById("password"),confirmPassword=document.getElementById("confirm-password");form.addEventListener("submit",(e=>{e.preventDefault(),inputsCheck(),successMessage()}));const inputsCheck=()=>{const e=firstName.value.trim(),s=lastName.value.trim(),t=email.value.trim(),r=password.value.trim(),a=confirmPassword.value.trim();""===e?setError(firstName,"First name cannot be blank"):setSuccess(firstName),""===s?setError(lastName,"Last name cannot be blank"):setSuccess(lastName),""===t?setError(email,"Email cannot be blank"):isEmail(t)?setSuccess(email):setError(email,"Email is not valid"),""===r?setError(password,"Password cannot be blank"):setSuccess(password),""===a?setError(confirmPassword,"Password cannot be blank"):r!==a?setError(confirmPassword,"Passwords do not match"):setSuccess(confirmPassword)},setError=(e,s)=>{const t=e.parentElement;t.querySelector("small").innerText=s,t.className="input-wrapper error"},setSuccess=e=>{e.parentElement.className="input-wrapper success"},isEmail=e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),successMessage=()=>{const e=document.querySelectorAll(".input-wrapper");let s=0;for(i=0;i<e.length;i++){if(!0!==e[i].classList.contains("success")){s++;break}}1!==s&&alert("You have successfully placed your order!")};