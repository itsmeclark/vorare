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
      db.orderDetails = []
      transaction.put(db)
    }
  }
  history.back()
}

function updateItem() {
  let openData = indexedDB.open("vorareDatabase", 1)
  openData.onsuccess = () => {
    let db = openData.result
    let transaction = db.transaction("Account", "readonly").objectStore("Account")
    let data = transaction.get(localStorage.getItem("Email").toLowerCase())
    data.onsuccess = () => {
      let db = data.result
      let cart = db.orderDetails
      let total = 0
      for (i = 0; i < cart.length; i++) {
        total += cart[i].product_quantity * cart[i].product_price
      }
      let payment = (total + shippingTotal) * platformVoucher
      let sdas = Math.floor(payment)
      document.querySelector(".productTotal").innerHTML = `&#8369;${total}`
      document.querySelector('.total').innerHTML = `&#8369;${sdas}`
      document.getElementById("displayItems").innerHTML = ` <img src="${cart[0].product_chosen_img}">
                  <p class='product_name'>${cart[0].product_name}</p>
                  <p class="product_chosen_variant">Variant: ${cart[0].product_chosen_variant}</p>
                  <p class="product_quantity">Quantity: ${cart[0].product_quantity}<p>
                  <p class="product_price">&#8369;${cart[0].product_quantity * cart[0].product_price}</p>
                  <p class="product-size">Size: ${cart[0].product_size}<p>`
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
        let div = document.createElement('div');
        div.classList.add("cartContainer");
        div.innerHTML = `<a href="${carts.product_location}">
            <img src="${carts.product_chosen_img}">
            <p class='product_name'>${carts.product_name}</p>
            <p class="product_chosen_variant">Variant: ${carts.product_chosen_variant}</p>
            <p class="product_quantity">Quantity: ${carts.product_quantity}<p>
            <p class="product_price">&#8369;${carts.product_quantity * carts.product_price}</p>
            <p class="product-size">Size: ${carts.product_size}<p>
            </a>
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