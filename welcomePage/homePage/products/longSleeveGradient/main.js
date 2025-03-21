
let quantityField = document.getElementById("quantityField")
let addQuantity = document.getElementById("addQuantity")
let reduceQuantity = document.getElementById("reduceQuantity")
let product_quantity = 0
addQuantity.onclick = () => {
  product_quantity += 1
  quantityField.textContent = product_quantity
  products.forEach((product)=>{
    product.product_quantity = product_quantity
  })
}
reduceQuantity.onclick = () => {
  product_quantity -= 1
  quantityField.textContent = product_quantity
  if(product_quantity < 0){
    product_quantity = 0
    quantityField.textContent = product_quantity
  
  }
}

let variants = [
  "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant1.png",
  "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant2.png",
  "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant3.png",
  "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant4.png",
  "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant5.png",
  "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant6.png"
  ]
  let products = [
    {
      product_name: "Long Sleeve Gradient",
      product_price: 499,
      product_location: "/Vorare/welcomePage/homePage/products/longSleeveGradient/index.html",
      product_chosen_variant: "Green",
      product_chosen_img: "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant1.png",
      product_size: "",
      product_quantity: product_quantity,
      product_shop: "TrendTrove"
    },
    {
      product_name: "Long Sleeve Gradient",
      product_price: 499,
      product_location: "/Vorare/welcomePage/homePage/products/longSleeveGradient/index.html",
      product_chosen_variant: "Yellow",
      product_chosen_img: "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant2.png",
      product_size: "",
      product_quantity: product_quantity,
      product_shop: "TrendTrove"
    },
    {
      product_name: "Long Sleeve Gradient",
      product_price: 499,
      product_location: "/Vorare/welcomePage/homePage/products/longSleeveGradient/index.html",
      product_chosen_variant: "White",
      product_chosen_img: "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant3.png",
      product_size: "",
      product_quantity: product_quantity,
      product_shop: "TrendTrove"
    },
    {
      product_name: "Long Sleeve Gradient",
      product_price: 499,
      product_location: "/Vorare/welcomePage/homePage/products/longSleeveGradient/index.html",
      product_chosen_variant: "Purple",
      product_chosen_img: "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant4.png",
      product_size: "",
      product_quantity: product_quantity,
      product_shop: "TrendTrove"
    },
    {
      product_name: "Long Sleeve Gradient",
      product_price: 499,
      product_location: "/Vorare/welcomePage/homePage/products/longSleeveGradient/index.html",
      product_chosen_variant: "Biege",
      product_chosen_img: "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant5.png",
      product_size: "",
      product_quantity: product_quantity,
      product_shop: "TrendTrove"
    },
    {
      product_name: "Long Sleeve Gradient",
      product_price: 499,
      product_location: "/Vorare/welcomePage/homePage/products/longSleeveGradient/index.html",
      product_chosen_variant: "Black",
      product_chosen_img: "/Vorare/welcomePage/homePage/products/longSleeveGradient/variant6.png",
      product_size: "",
      product_quantity: product_quantity,
      product_shop: "TrendTrove"
    }
    ]
    
let heartBtn = document.getElementById("heartBtn")
let productImg = document.querySelectorAll(".variant")
let mainImg = document.getElementById("mainImg")
let count = 0
productImg.forEach((btn, index)=>{
  btn.onclick = () => {
    mainImg.src = variants[index]
    count = 0
  }
})
setInterval(()=>{
  count++
  if(count >= 8){
    mainImg.src = "/Vorare/welcomePage/homePage/products/longSleeveGradient/manIMg.jpg"
    count = 0
  }
}, 1000)

//SHIPPING FEE DETAILS
let shippingBtn = document.getElementById('shipping')
let closeShipping = document.getElementById('closeBtn')
let shipping = document.getElementById('shippingPopUp')

shippingBtn.onclick = () => {
  shipping.style.display = "block";
  setTimeout(() => {
    shipping.style.transition = "transform 0.5s ease";
    shipping.style.transform = "translateY(0%)";
  }, 100);
  description.style.transition = "transform 0.5s ease";
  description.style.transform = "translateY(100%)";
  setTimeout(() => {
    description.style.display = "none"
  }, 200);
};
closeShipping.onclick = () => {
  shipping.style.transition = "transform 0.5s ease";
  shipping.style.transform = "translateY(100%)";
  setTimeout(() => {
  shipping.style.display = "none"
  }, 200);
}
//

///DESCRIPTION
let description = document.querySelector("#description")
let closeDescription = document.querySelector("#closeDescription")
let productDescription = document.querySelector(".product-description")

productDescription.onclick = () => {
  description.style.display = "block";
  setTimeout(() => {
    description.style.transition = "transform 0.5s ease";
    description.style.transform = "translateY(0%)";
  }, 100);
  shipping.style.transition = "transform 0.5s ease";
  shipping.style.transform = "translateY(100%)";
  setTimeout(() => {
    shipping.style.display = "none"
  }, 200);
};
closeDescription.onclick = () => {
  description.style.transition = "transform 0.5s ease";
  description.style.transform = "translateY(100%)";
  setTimeout(() => {
    description.style.display = "none"
  }, 200);
}
///PRODUCT ADD TO CART
let cartBtn = document.getElementById("addToCart")
let closeCart = document.getElementById("closeCart")
let displayCart = document.getElementById("displayAddToCart")
cartBtn.onclick = () => {
  document.getElementById("Buynow").style.display= "none"
  displayCart.style.display = "block"
    document.getElementById("addToCartNow").style.display = 'block'
  setTimeout(() => {
    displayCart.style.transition = "transform 0.5s ease";
    displayCart.style.transform = "translateY(0%)";
  }, 100);
  document.querySelector("body").style.overflowY = "hidden"
  document.querySelector(".transparentBG").style.display = "block"
}
closeCart.onclick = () => {
    displayCart.style.transition = "transform 0.5s ease";
    displayCart.style.transform = "translateY(100%)";
  setTimeout(() => {
    displayCart.style.display = "none"
    document.getElementById("Buynow").style.display= "none"
    document.getElementById("addToCartNow").style.display = 'none'
    for (i = 0; i < variant.length; i++) {
      variant[i].style.border = "solid 2px gainsboro"
      checkVariant[i].style.display = "none"
      
    }
    for (i = 0; i < sizes.length; i++) {
      sizes[i].style.border = "solid 2px gainsboro"
      checkSizes[i].style.display = "none"
    }
    product_quantity = 0
    quantityField.textContent = product_quantity
  }, 500);
  document.querySelector("body").style.overflowY = "scroll"
  document.querySelector(".transparentBG").style.display = "none"
  
}
//PROCUCT VARIANTS
let variant = document.querySelectorAll(".productVariant")
let checkVariant = document.querySelectorAll(".checkVariant")
let sizes = document.querySelectorAll(".sizes")
let checkSizes = document.querySelectorAll(".checkSize")
let arraySize = [
    'Medium',
    'Large',
    'Extra-Large'
  ]
let product_chosen_variant;
let product_chosen_img;
let press = false


variant.forEach((variants, index)=>{
  variants.onclick = () =>{
    for(i=0;i < variant.length; i++){
      variant[i].style.border = "solid 2px gainsboro"
      checkVariant[i].style.display = "none"
    }
    variant[index].style.border = "solid 2px #15f5ba"
    checkVariant[index].style.display = "block"
sizes.forEach((size, indexOf)=>{
  size.onclick = () =>{
    for (i = 0; i < sizes.length; i++) {
      sizes[i].style.border = "solid 2px gainsboro"
      checkSizes[i].style.display = "none"
    }
    sizes[indexOf].style.border = "solid 2px #15f5ba"
    checkSizes[indexOf].style.display = "block"
    products[index].product_size = arraySize[indexOf]
    let addToCartNow = document.getElementById("addToCartNow")
    addToCartNow.onclick = () => {
      if(product_quantity === 0){
        return;
      }
      else{
        for (i = 0; i < variant.length; i++) {
          variant[i].style.border = "solid 2px gainsboro"
          checkVariant[i].style.display = "none"
        }
        for (i = 0; i < sizes.length; i++) {
          sizes[i].style.border = "solid 2px gainsboro"
          checkSizes[i].style.display = "none"
        }
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
            addTocart.push(products[index])
            db.cart = addTocart
            addCart.put(db)
            product_quantity = 0
            quantityField.textContent = product_quantity
          }
        }
        
        displaySuccess.style.display = "flex"
        setTimeout(() => {
          displaySuccess.style.opacity = "1"
          setTimeout(() => {
            displaySuccess.style.opacity = "0"
            setTimeout(() => {
              displaySuccess.style.display = "none"
            }, 2500)
          }, 2000)
        }, 100)
      }
    }
    document.getElementById("Buynow").onclick = () => {
      if (product_quantity === 0) {
        return;
      }
      else {
        for (i = 0; i < variant.length; i++) {
          variant[i].style.border = "solid 2px gainsboro"
          checkVariant[i].style.display = "none"
        }
        for (i = 0; i < sizes.length; i++) {
          sizes[i].style.border = "solid 2px gainsboro"
          checkSizes[i].style.display = "none"
        }
        closeCart.click()
        let openData = indexedDB.open("vorareDatabase", 1)
        openData.onsuccess = () => {
          let db = openData.result
          let transaction = db.transaction("Account", "readwrite").objectStore("Account")
          let data = transaction.get(localStorage.getItem("Email"))
          data.onsuccess = () => {
            let db = data.result
            let checkOut = db.checkOutCart || []
            checkOut = []
            checkOut.push(products[index]);
            db.checkOutCart = checkOut;
            transaction.put(db)
            product_quantity = 0
            quantityField.textContent = product_quantity
            window.location.href = "/Vorare/welcomePage/homePage/check_out/index.html"
          }
        }
      }
    }
    
    }
  })
  }
})

//PRODUCT QUANTITY

///LIKED PRODUCT
let liked = false
heartBtn.onclick = () => {
  if(liked===false){
    heartBtn.innerHTML = `<i style="color: #15f5ba;" class="fa-solid fa-heart"></i>`
    let openData = indexedDB.open("vorareDatabase", 1)
    
    openData.onsuccess = () => {
      
    }
    liked = true
  }
  else{
    heartBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`
    liked = false
  }
}
let buyNow = document.querySelector("#buyNow")
buyNow.onclick = () => {
  cartBtn.click()
  document.getElementById("Buynow").style.display= "block"
  document.getElementById("addToCartNow").style.display = 'none'
  
}
