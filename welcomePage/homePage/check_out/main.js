let shippingTotal = 60
let platformVoucher = 0.40

function goBack() {
  let openData = indexedDB.open("vorareDatabase", 1)
  openData.onsuccess = () => {
    let db = openData.result
    let transaction = db.transaction("Account", "readwrite").objectStore("Account")
    let data = transaction.get(localStorage.getItem("Email"))
    data.onsuccess = () => {
      let db = data.result
      db.checkOutCart = []
      transaction.put(db)
    }
  }
  history.back()
}

function updateItem() {
  let openData = indexedDB.open("vorareDatabase", 1)
  openData.onsuccess = () => {
    let db = openData.result
    let transaction = db.transaction("Account", "readwrite").objectStore("Account")
    let data = transaction.get(localStorage.getItem("Email").toLowerCase())
    data.onsuccess = () => {
      let db = data.result
      let cart = db.checkOutCart
      let total = 0
      let quantity = cart[0].product_quantity
      let quan = quantity * cart[0].product_price
      
      for (i = 0; i < cart.length; i++) {
        total += cart[i].product_quantity * cart[i].product_price
      }
      let payment = (total + shippingTotal) * platformVoucher
      let  sdas = Math.floor(payment)
      document.querySelector(".productTotal").innerHTML = `&#8369;${total}`
      document.querySelector('.total').innerHTML = `&#8369;${sdas}`
      document.getElementById("totalPayment").innerHTML = `&#8369;${sdas}`
      document.getElementById("displayItems").innerHTML = ` <img src="${cart[0].product_chosen_img}">
                  <p class='product_name'>${cart[0].product_name}</p>
                  <p class="product_chosen_variant">Variant: ${cart[0].product_chosen_variant}</p>
                  <p class="product_quantity">Quantity: ${cart[0].product_quantity}<p>
                  <p class="product_price">&#8369;${quan}</p>
                  <p class="product-size">Size: ${cart[0].product_size}<p`
      if (cart[0].product_size === undefined) {
        document.getElementById("displayItems").querySelector(".product-size").style.display = "none"
      }
      document.getElementById("displayTotal").innerHTML = `&#8369;${total}`
      document.getElementById("totalProducts").innerHTML = `Order Total (${cart.length} items): `
      document.querySelector(".priceProducts").innerHTML = `&#8369;${total}`
      document.getElementById("displayItems").onclick = () => {
        if (cart.length !== 1) {
          document.querySelector(".bgcontainer").style.display = 'block'
          document.querySelector(".containerItems").style.display = 'block'
        }
        else {
          window.location.href = `${cart[0].product_location}`
        }
      }
          document.querySelector(".containerItems").innerHTML = ""
          
          let btn = document.createElement("button")
          btn.classList.add("closeItem")
          btn.innerHTML = 'X'
          document.querySelector(".containerItems").appendChild(btn)
          document.querySelector('.closeItem').onclick = () => {
          document.querySelector(".bgcontainer").style.display = 'none'
          document.querySelector(".containerItems").style.display = 'none'
        }
        cart.forEach((carts, index) => {
      let quantity = cart[index].product_quantity
      let price = quantity * carts.product_price
        
          let div = document.createElement('div');
          div.classList.add("cartContainer");
          div.innerHTML = `<a href="${carts.product_location}">
            <img src="${carts.product_chosen_img}">
            <p class='product_name'>${carts.product_name}</p>
            <p class="product_chosen_variant">Variant: ${carts.product_chosen_variant}</p>
            <p class="product_quantity">Quantity: ${carts.product_quantity}<p>
            <p class="product_price">&#8369;${price}</p>
             <p class="product-size">Size: ${carts.product_size}<p>
            </a>
           
            <button id="deleteItem" onclick="deleteItem(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></button>
          `;
          if (carts.product_size === undefined) {
            div.querySelector(".product-size").style.display = "none"
          }
          document.querySelector(".containerItems").appendChild(div);
        })
    }
  }
}

updateItem()

function deleteItem(index) {
  let openData = indexedDB.open("vorareDatabase", 1);

  openData.onsuccess = () => {
    let db = openData.result;
    let transactionData = db.transaction("Account", "readwrite").objectStore("Account");

    transactionData.get(localStorage.getItem("Email")).onsuccess = (event) => {
      let record = event.target.result;
      let cart = record.checkOutCart;

      // Remove item from cart array
      cart.splice(index, 1);
    
      // Update the record in indexedDB
      record.checkOutCart = cart
      transactionData.put(record).onsuccess = () => {
          updateItem();
          // Update the displayed cart after deletion
          if(cart.length === 0){
            history.back()
          }
      };
    };
  };
}

document.getElementById("placeOrder").onclick = () => {
  let openData = indexedDB.open("vorareDatabase", 1)
  openData.onsuccess = () => {
      let db = openData.result
      let transaction = db.transaction("Account", "readwrite").objectStore("Account")
      let data = transaction.get(localStorage.getItem("Email").toLowerCase())
      data.onsuccess = () => {
          let db = data.result
          let cart = db.checkOutCart
          let toPay = db.toPay || []
          let total = 0
          for (i = 0; i < cart.length; i++) {
            total += cart[i].product_price
          }
          let payment = (total + shippingTotal) * platformVoucher
          toPay.push(cart)
          db.toPay = toPay
          transaction.put(db).onsuccess = () => {
            console.log(db.toPay)
          }
          window.location.href = `/Vorare/welcomePage/homePage/myProfile/purchaseHistory/index.html`
    }
  }
}