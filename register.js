class RegisterUser{
    constructor(regname, regemail,password1,password2) {
      this.regname = regname;
      this.regemail = regemail;
      this.password1 = password1;
      this.password2 = password2;
    }
  }

document.getElementById("createAccount").addEventListener("submit", function(event) {
    event.preventDefault(); 
   
     //for the registration
     const registername =document.querySelector('input[name="txtname"]');
     const userEmaill = document.querySelector('input[name="txtemail"]');
     const passwordone = document.querySelector('input[name="pswd1"]');
     const passwordtwo = document.querySelector('input[name="pswd2"]');
  
     const regNameValue = registername.value;
     const regEmail = userEmaill.value;
     const firstpswd = passwordone.value;
     const secondpswd = passwordtwo.value;
     
     if (regNameValue.trim() === '' || regEmail.trim() === '' || firstpswd.trim() === '' || secondpswd.trim() ==='') {
      alert('Please enter all required fields.');
      return;
    }
  
    if(!isValidEmail(regEmail)){
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!isPasswordValid(firstpswd)) {
      alert('Password should have at least 4 characters, and a number');
      return;
    }
    if (!isPasswordValid(secondpswd)) {
      alert('Password should have at least 4 characters, and a number');
      return;
    }
 
    checkPasswordMatch(firstpswd,secondpswd);
     
  
   //register
   const registeruser = new RegisterUser(regNameValue,regEmail,firstpswd,secondpswd);
  
   sessionStorage.setItem('RegisterUser', JSON.stringify(registeruser));
  
  
  });
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  
  function isPasswordValid(password){
     const passwordRegex = /^(?=.*[a-z])(?=.*\d).{4,}$/;
    return passwordRegex.test(password);
  }

  function checkPasswordMatch(passwordone, passwordtwo){
        if(passwordone ===passwordtwo){
          console.log("passwords match");
          alert("Account Created!")
          window.location.href = "home.html";
        }else {
        alert("Passwords do not match!");
          window.location.href = "register.html";
        }
      
  }

  