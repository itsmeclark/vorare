let shippingTotal = 60
let platformVoucher = 0.40


function updateContainer(){
  let openData = indexedDB.open("vorareDatabase", 1)
  openData.onsuccess = () => {
    let db = openData.result
    let transaction = db.transaction("Account", "readonly").objectStore("Account")
    let data = transaction.get(localStorage.getItem("Email").toLowerCase())
    data.onsuccess = () => {
      let db = data.result
      let cart = db.checkOutCart
      let toPay = db.toPay || []
      if(toPay.length === 0){
        document.getElementById("display_no_order").style.display = "block"
      }
       document.getElementById("container").innerHTML = ""
      toPay.forEach((products, index)=>{
        
        let total = 0
        for (i = 0; i < products.length; i++) {
          total += products[i].product_quantity * products[i].product_price
        }
        let payment = (total + shippingTotal) * platformVoucher
        let div = document.createElement("div")
        div.classList.add("payContainer")
        div.innerHTML = `
                      <a href='/Vorare/welcomePage/homePage/myProfile/purchaseHistory/orderDetails/index.html'>
                      <nav class="bottom">
                      <p class="totalItems">Total Items: ${products.length}
                      </p>
                      <p class="amount">
                      Amount Payable:<p id="payable">&#8369;${Math.floor(payment)}</p> 
                      </p>
                      </nav>
                      <button id="pending">Pending</button>
                      </a>
                      <button class="cancelOrder">Cancel</button>
                  `
                  
        document.getElementById("container").appendChild(div)
        div.onclick = () => {
          let dataBase = indexedDB.open("vorareDatabase", 1)
          
          dataBase.onsuccess = () =>{
            let db = openData.result
            let transaction = db.transaction("Account", "readwrite").objectStore("Account")
            let data = transaction.get(localStorage.getItem("Email").toLowerCase())
            data.onsuccess = () => {
              let db = data.result
              let cart = db.checkOutCart
              let toPay = db.toPay || []
              db.orderDetails = toPay[index]
              transaction.put(db)
             
            }
          }
        }
        products.forEach((product)=>{
          let con = document.createElement("div")
          let price = product.product_quantity * product.product_price
          con.classList.add("eachContainer")
          con.innerHTML = `
          <a href='/Vorare/welcomePage/homePage/myProfile/purchaseHistory/orderDetails/index.html'>
            <img src="${product.product_chosen_img}">
           <p class='product_name'>${product.product_name}</p>
          <p class="product_chosen_variant">Variant: ${product.product_chosen_variant}</p>
          <p class="product_quantity">Quantity: ${product.product_quantity}<p>
          <p class="product_price">&#8369;${price}</p>
          <p class="product-size">Size: ${product.product_size}<p>
          </a>
          `
          if (product.product_size === undefined) {
            con.querySelector(".product-size").style.display = "none"
          }
          div.appendChild(con)
          
        })
      })
    }
  }
}
updateContainer()

function goBack() {
  window.location.href = "/Vorare/welcomePage/homePage/myProfile/index.html"
}


document.getElementById("container").addEventListener("click", function(event) {
  if (event.target.classList.contains("cancelOrder")) {
    let index = Array.from(this.querySelectorAll(".cancelOrder")).indexOf(event.target);
        let openData = indexedDB.open("vorareDatabase", 1)
        openData.onsuccess = () => {
            let db = openData.result
            let transaction = db.transaction("Account", "readwrite").objectStore("Account")
            let data = transaction.get(localStorage.getItem("Email").toLowerCase())
            data.onsuccess = () => {
                let db = data.result
                let cart = db.checkOutCart
                let toPay = db.toPay || []
                toPay.splice(index, 1)
                db.toPay = toPay
                transaction.put(db)
                updateContainer()
            }
        }
  }
});
