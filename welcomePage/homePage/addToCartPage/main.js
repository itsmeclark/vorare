let container = document.getElementById("container");

function updateCart() {
  let openData = indexedDB.open("vorareDatabase", 1);

  openData.onsuccess = () => {
    let db = openData.result;
    let transactionData = db.transaction("Account", "readwrite").objectStore("Account");
    let getData = transactionData.get(localStorage.getItem("Email").toLowerCase());

    getData.onsuccess = () => {
      let dbResult = getData.result;
      let cart = dbResult.cart || [];
      dbResult.checkOutCart = []
      transactionData.put(dbResult)
      
      // Clear existing items in the container before updating
      container.innerHTML = "";
      if(cart.length === 0){
        document.querySelector(".emptyCart").style.display = "block"
      }
      else{
        document.querySelector(".emptyCart").style.display = "none"
      }
      cart.forEach((carts, index) => {
        let quantity = cart[index].product_quantity
        let quan;
        for(i = 0;i < quantity; i++){
          quan = quantity * cart[index].product_price
        }
        let div = document.createElement('div');
        div.classList.add("cartContainer");
        div.innerHTML = `<a href="${carts.product_location}">
          <img src="${carts.product_chosen_img}">
          <p class='product_name'>${carts.product_name}</p>
          <p class="product_chosen_variant">Variant: ${carts.product_chosen_variant}</p>
          <p class="product_quantity">Quantity: ${carts.product_quantity}<p>
          <p class="product_price">&#8369;${quan}</p>
          <p class="product-size">Size: ${carts.product_size}<p>
          </a>
          <input type="checkbox" class="checkBox">
          
          <button id="deleteItem" onclick="deleteItem(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></button>
        `;
        if (carts.product_size === undefined) {
          div.querySelector(".product-size").style.display = "none"
        }
        container.appendChild(div);
        
        let checkBox = document.getElementsByClassName("checkBox")
        let displayTotal = document.getElementById("displayTotal")
        let total = 0
        let productInfo = {
          product_name: carts.product_name,
          product_price: carts.product_price,
          product_location: carts.product_location,
          product_chosen_variant: carts.product_chosen_variant,
          product_chosen_img: carts.product_chosen_img,
          product_quantity: carts.product_quantity,
        }
        Array.from(checkBox).forEach((chck, index)=>{
        chck.onclick = () => {
          if (chck.checked) {
            let quantity = cart[index].product_quantity
            let quan;
            for (i = 0; i < quantity; i++) {
              quan = quantity * cart[index].product_price
            }
            displayTotal.style.display = "block"
            total += quan
            document.getElementById("totalItem").innerHTML = `&#8369;${total}`;
            let openData = indexedDB.open("vorareDatabase", 1)
            openData.onsuccess = ()=> {
              let db = openData.result
              let transaction = db.transaction("Account", "readwrite").objectStore("Account")
              let data = transaction.get(localStorage.getItem("Email"))
              data.onsuccess = () => {
                let db = data.result
                let checkOut = db.checkOutCart || []
                checkOut.push(dbResult.cart[index]);
                db.checkOutCart = checkOut;
                transaction.put(db)
              }
            }
          }
          else if(displayTotal.style.display === "block"){
            let quantity = cart[index].product_quantity
            let quan;
            for (i = 0; i < quantity; i++) {
              quan = quantity * cart[index].product_price
            }
              total -= quan
              document.getElementById("totalItem").innerHTML = `&#8369;${total}`;
              if (total === 0) {
                displayTotal.style.display = "none"
                let openData = indexedDB.open("vorareDatabase", 1)
                openData.onsuccess = () => {
                  let db = openData.result
                  let transaction = db.transaction("Account", "readwrite").objectStore("Account")
                  let data = transaction.get(localStorage.getItem("Email").toLowerCase())
                  data.onsuccess = () => {
                    let db = data.result
                    db.checkOutCart = []
                    transaction.put(db)
                  }
                }
              }
              let openData = indexedDB.open("vorareDatabase", 1)
              openData.onsuccess = () => {
                let db = openData.result
                let transaction = db.transaction("Account", "readwrite").objectStore("Account")
                let data = transaction.get(localStorage.getItem("Email").toLowerCase())
                data.onsuccess = () => {
                  let db = data.result
                  let checkOut = db.checkOutCart || []
                  checkOut.pop();
                  db.checkOutCart = checkOut;
                  transaction.put(db)
                }
              }
            }
         }
        })
      });
    };
  };
}

updateCart();

function deleteItem(index) {
  let openData = indexedDB.open("vorareDatabase", 1);

  openData.onsuccess = () => {
    let db = openData.result;
    let transactionData = db.transaction("Account", "readwrite").objectStore("Account");

    transactionData.get(localStorage.getItem("Email").toLowerCase()).onsuccess = (event) => {
      let record = event.target.result;
      let cart = record.cart;

      // Remove item from cart array
      cart.splice(index, 1);
    
      // Update the record in indexedDB
      record.cart = cart
      transactionData.put(record).onsuccess = () => {
        displayTotal.style.display = "none"
        updateCart(); // Update the displayed cart after deletion
      };
    };
  };
}
