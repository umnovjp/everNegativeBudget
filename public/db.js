let db;
let budgetVersion;
// create a new db request for a "BudgetDB" database.
const request = indexedDB.open('BudgetDB', budgetVersion || 21);

request.onupgradeneeded = function (event) {
  // create object store called "BudgetStore" and set autoIncrement to true
  console.log('Upgrade needed in IndexDB');

  const { oldVersion } = event;
  const newVersion = event.newVersion || db.version;

  console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

  db = event.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore('transactions', { autoIncrement: true });
  }

};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(`Woops! ${event.target.errorCode}`);
};

function saveRecord(record) {
    console.log('Save record invoked');
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction(['transactions'], 'readwrite');
  // access your pending object store
  const store = transaction.objectStore('transactions');
  // add record to your store with add method.
  store.add(record);
};

function checkDatabase() {
    console.log('check db invoked');
  // open a transaction on your pending db
  let transaction = db.transaction(['transactions'], 'readwrite');
  // access your pending object store
  const store = transaction.objectStore('transactions');
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
          // If our returned response is not empty
          if (res.length !== 0) {
            // Open another transaction to BudgetStore with the ability to read and write
            transaction = db.transaction(['transactions'], 'readwrite');

            // Assign the current store to a variable
            const currentStore = transaction.objectStore('transactions');

            // Clear existing entries because our bulk add was successful
            currentStore.clear();
            console.log('Clearing store 🧹');
          }

        });
    }
  };
  console.log('ended checkDB')
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
// module.exports = saveRecord;
