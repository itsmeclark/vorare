let emailFeild = document.getElementById("email")
let passwordFeild = document.getElementById("password")
let loginBtn = document.getElementById('loginBtn')



//CLICK LOGIN BUTTON IF USE PRESS PASSWORD INPUT ENTER
passwordFeild.addEventListener("keypress", ()=>{
    if(event.key === "Enter"){
        loginBtn.click()
    }
    
 })

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