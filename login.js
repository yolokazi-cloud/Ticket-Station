class User{
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

document.getElementById("signInForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const usernameInput = document.querySelector('input[name="txt"]');
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="pswd"]');
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  //login validation
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert('Please enter all required fields.');
    return;
  }


  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!isPasswordValid(password)) {
    alert('Password should have at least 4 characters, and a number');
    return;
  }


  const user = new User(username, email, password);

  sessionStorage.setItem('user', JSON.stringify(user));

  window.location.href = "events.html";

});


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function isPasswordValid(password){
   const passwordRegex = /^(?=.*[a-z])(?=.*\d).{4,}$/;
  return passwordRegex.test(password);
}


