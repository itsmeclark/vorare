// DECLARING VARIABLES
let accoutName = document.getElementById("accoutName");
let emailFeild = document.getElementById("email");
let passwordFeild = document.getElementById('password');
let signUpBtn = document.getElementById("signupBtn")
let user;
let submitPin = document.getElementById("submitPin")
signUpBtn.onclick = () => {
  // Verify whether the user has not yet entered the form.
  if (accoutName.value.trim() === "" || emailFeild.value.trim() === "" || passwordFeild.value.trim() === "") {
    alert("Create an Account First");
  } 
  else if (!termsCheck.checked) {
    alert("Check the terms and privacy first");
  }
  else {
   
    //open DATABASE
    let db;
    let openRequest = indexedDB.open("vorareDatabase", 1);
    openRequest.onsuccess = (event) => {
      db = openRequest.result;
      let getObject = db.transaction("Account", "readwrite").objectStore("Account")
      let getEmail = getObject.get(emailFeild.value.trim().toLowerCase())
      getEmail.onsuccess = () => {
        let db = getEmail.result
        if(db){ 
          alert("Email Already Use")
        }
        else{
          document.getElementById("userPin").style.display = "block"
          document.getElementById("submitPin").onclick = () => {
            let pins = document.querySelectorAll('input[type="number"]')
            let inputUser = ""
            for(let i = 0;i < pins.length;i++){
              inputUser += pins[i].value
            }
              user = {
                name: accoutName.value.trim().toLowerCase(),
                email: emailFeild.value.trim().toLowerCase(),
                password: passwordFeild.value.trim().toLowerCase(),
                pin: inputUser,
                address: "none",
                contactNumber: "none"
              };
              let openData = indexedDB.open("vorareDatabase", 1);
              openData.onsuccess = (event) => {
                  db = openData.result;
                  let getData = db.transaction("Account", "readwrite").objectStore("Account")
                  getData.add(user)
                  alert("Account Successfully Created!")
                  window.location.href = "/Vorare/welcomePage/LOGINFORM/LoginPage/loginPage/index.html"
              }
          }
         
        }
        }
    // Display if the user successfully registered
    
    };
  }
  
}

passwordFeild.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    signUpBtn.click()
  }
});
let svg1 = document.querySelector(".svg1")
let svg2 = document.querySelector(".svg2")

passwordFeild.onclick = () => {
  svg1.style.display = "flex"
}
svg1.onclick = () => {
  svg1.style.display = "none"
  svg2.style.display = "flex"
  passwordFeild.type = "text"
}
svg2.onclick = () => {
  svg2.style.display = "none"
  svg1.style.display = "flex"
  passwordFeild.type = "password"
}



const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach((input, index) => {
  input.addEventListener('input', function(event) {
    // Get the input value
    let inputValue = this.value;
    if(inputValue.length > 1 ){
      inputValue = inputValue.slice(0, 1)
      this.value = inputValue
    }
    // Check if input value is entered
    if (inputValue.length > 0) {
      // Move focus to the next input if available
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  });
});

let closePin = document.getElementById("closePin")
closePin.onclick = () => {
    document.getElementById("userPin").style.display = "none"
  
}