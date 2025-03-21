//Declaring variables
let logoutBtn = document.getElementById('logoutBtn')
let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let user = localStorage.getItem("ACCOUNT")
let userJson = JSON.parse(user)
let changeTheme = document.getElementById("changeTheme")
const buttons = document.querySelectorAll(".btn")
const body = document.querySelector("body");
let backButton = document.getElementById("backButton")
let faUserLock = document.getElementsByClassName('fa-user-lock')
let faClock = document.getElementsByClassName('fa-clock-rotate-left')
let faCircle = document.getElementsByClassName('fa-circle-question')
let faGear = document.getElementsByClassName('fa-gear')
let faUserPlus = document.getElementsByClassName('fa-user-plus')
let faLogout = document.getElementsByClassName('fa-right-from-bracket')
//open database
let openData = indexedDB.open("vorareDatabase", 1)
openData.onsuccess = () => {
  let db = openData.result
  let user = db.transaction("Account", "readonly").objectStore("Account")
  
  let account = user.get(localStorage.getItem("Email"))
  account.onsuccess = ()=> {
    let db = account.result
    //display User name
    userName.textContent = db.name
    userEmail.textContent = db.email
    
  }
}
function jkl() {
  // Tab to edit
  if(localStorage.getItem("lightTheme") === ""){
    localStorage.setItem("lightTheme", "true")
  }
  else if (localStorage.getItem("lightTheme") === "false") {
    localStorage.setItem("lightTheme", "false")
  }
  else {
    let tem = ""
    localStorage.setItem("lightTheme", tem)
  }
}
jkl()

theme()
changeTheme.onclick = ()=> {
  if(localStorage.getItem("lightTheme") === "true"){
    localStorage.setItem("lightTheme", "false")
    }
  else if(localStorage.getItem("lightTheme") === "false"){
    localStorage.setItem("lightTheme", "true")
  }
 jkl()
  theme()
}
//changeTheme
function theme() {
  let mode = localStorage.getItem("lightTheme")
      //white theme
      if(mode === "true"){
          changeTheme.innerHTML = '<i class="fa-solid fa-moon"></i>'
              //user name
              userName.style.color = "black"
              changeTheme.style.color = "black"
              //buttons
              buttons.forEach((button)=>{
                  button.style.backgroundColor = "white"
                  button.style.color = "rgb(59, 59, 59)"
              })
              //backgroundColor
              body.style.backgroundColor = "white"
              backButton.style.color = "black"
              //icons
              faUserLock[0].style.color = "black"
              faClock[0].style.color = "black"
              faCircle[0].style.color = "black"
              faGear[0].style.color = "black"
              faUserPlus[0].style.color = "black"
              faLogout[0].style.color = "black"
             
      }
      //dark theme
      else if(mode === "false"){
          changeTheme.innerHTML = '<i class="fa-solid fa-sun"></i>'
              //user name
              userName.style.color = "white"
              changeTheme.style.color = "white"
              //buttons
              buttons.forEach((button)=>{
                  button.style.backgroundColor = "rgb(59, 59, 59)"
                  button.style.color = "white"
              })
              //backgroundColor
              body.style.backgroundColor = "rgba(0, 0, 0, 0.89)"
              backButton.style.color = "white"
              //icons
              faUserLock[0].style.color = "white"
              faClock[0].style.color = "white"
              faCircle[0].style.color = "white"
              faGear[0].style.color = "white"
              faUserPlus[0].style.color = "white"
              faLogout[0].style.color = "white"
             
      }
}
