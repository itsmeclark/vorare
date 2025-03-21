let deleteAccount = document.getElementById("deleteAccount")
let popUpDelete = document.getElementById('popUp')
let body = document.querySelector("body")
let password = document.getElementById('password')
let cancelDelete = document.getElementById("cancelDelete")
let submitPass = document.getElementById('submitPass')
let user = localStorage.getItem("ACCOUNT")
let userJson = JSON.parse(user)

deleteAccount.onclick = function(){
   popUpDelete.style.display = "block"
}
cancelDelete.onclick = () => {
   popUpDelete.style.display = "none"
}
submitPass.addEventListener("click",() => {
    let openData = indexedDB.open("vorareDatabase", 1)
    openData.onsuccess = () => {
      let db = openData.result
      let transaction = db.transaction("Account", "readwrite").objectStore("Account")
      let data = transaction.get(localStorage.getItem("Email"))
      data.onsuccess = () =>{
        let db = data.result
        if(db){
          if(password.value === db.password){
            transaction.delete(localStorage.getItem("Email")).onsuccess = () => {
              alert("Account deleted Succesfully!")
              window.location.href = "/Vorare/welcomePage/LOGINFORM/LoginPage/loginPage/index.html"
            }
          }
          else{
            alert("INCORRECT PASSWORD!")
            password.value = ""
          }
        }
      }
    }



      })
function goBack() {
    // Tab to edit  
  history.back()
}

