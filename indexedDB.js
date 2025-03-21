let db;
let openRequest = indexedDB.open("vorareDatabase", 1)
openRequest.onsuccess = () => {
  db = openRequest.result
}

openRequest.onupgradeneeded = () => {
  db = openRequest.result
  //USER ACCOUNT
  let account = db.createObjectStore("Account", {keyPath : "email"})
  account.createIndex("Email", "email")
  account.createIndex("Password", "password")
  account.createIndex("Name", "name")
  account.createIndex("Address", "address")
  account.createIndex("AccountType", "accountType")
  account.createIndex("contactNumber", "contactNumber")
  account.createIndex("email", "email")
  
}

if ('indexedDB' in window) {
  // IndexedDB is supported
  alert('IndexedDB is supported in this browser.');
} else {
  // IndexedDB is NOT supported
  alert('IndexedDB is NOT supported in this browser.');
}