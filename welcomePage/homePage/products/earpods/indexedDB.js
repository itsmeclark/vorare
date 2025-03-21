let addToCartNow = document.getElementById("addToCartNow")

let productInfo = {
  product_name : "Wireless Earphones",
  product_price : 299,
  product_location : "/Vorare/welcomePage/homePage/products/earpods/index.html",
  product_images: {
    variant1 : "/Vorare/welcomePage/homePage/products/earpods/variant1.png",
    variant2 : "/Vorare/welcomePage/homePage/products/earpods/variant2.png",
    variant3 : "/Vorare/welcomePage/homePage/products/earpods/variant3.png",
    variant4 : "/Vorare/welcomePage/homePage/products/earpods/variant4.png",
    variant5 : "/Vorare/welcomePage/homePage/products/earpods/variant5.png"
  },
  product_chosen_variant : product_chosen_variant,
  product_chosen_img : product_chosen_img,
  product_quantity : product_quantity,
  product_shop : "TechNest Official"

}

addToCartNow.onclick = () => {
  let displaySuccess = document.getElementById("displaySuccess")
  if(press === false){
    alert("choose a variant")
  }
  else if(product_quantity === 0){
    alert("Add a Product Quantity")
  }
  else{
  closeCart.click()
  let openData = indexedDB.open("vorareDatabase", 1)
  
  openData.onsuccess = () => {
    let db = openData.result
    let addCart = db.transaction("Account", "readwrite").objectStore("Account")
    let cart = addCart.get(localStorage.getItem("Email").toLowerCase())
    cart.onsuccess = () => {
      let db = cart.result
      let carts = db.cart || []
      let addTocart = carts
      addTocart.push(productInfo)
      db.cart = addTocart
      addCart.put(db)
    }
  }
    
  displaySuccess.style.display = "flex"
  setTimeout(()=>{
    displaySuccess.style.opacity = "1"
    setTimeout(()=>{
      displaySuccess.style.opacity = "0"
      setTimeout(()=>{
        displaySuccess.style.display = "none"
      }, 2500)
    }, 2000)
  }, 100)
  }
  
}
