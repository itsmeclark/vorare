
loginBtn.onclick = () => {
  let openData = indexedDB.open("vorareDatabase", 1)
  
  localStorage.setItem("Email", emailFeild.value.toLowerCase())
  
  openData.onsuccess = () => {
    let db = openData.result
    let data = db.transaction("Account", "readonly").objectStore("Account")
    
    let getUser = data.get(emailFeild.value.trim().toLowerCase())
      getUser.onerror = () => {
        alert("ACCOUNT NOT RECOGNIZED")
      }
      getUser.onsuccess = (event) => {
        
        let db = event.target.result
        if(db){
          let email = db.email
          let pass = db.password
          if(emailFeild.value.trim().toLowerCase() === email && passwordFeild.value.trim().toLowerCase() === pass ){
            window.open( "/Vorare/welcomePage/homePage/index.html", "_self")
          }
          else if(emailFeild.value.trim().toLowerCase() === email && passwordFeild.value.trim().toLowerCase() !== pass){
            alert("Incorrect Password!")
            emailFeild.value = ""
            passwordFeild.value = ""
          }
        }
        else{
          alert("Account not Recognized!")
          emailFeild.value = ""
          passwordFeild.value = ""
        }
        
      }
    
  }
  
}
