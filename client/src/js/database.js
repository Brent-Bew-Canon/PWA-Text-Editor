import { openDB } from 'idb';

const initdb = async () =>
  console.log('running init....')
openDB('jate', undefined, {
  upgrade(db) {
    if (db.objectStoreNames.contains('text')) {
      console.log('text table already exists');
      return;
    }
    db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
    console.log('text table created');
  },
});

//  Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);
  console.log('connection created')
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('text', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('text');

  // Use the .add() method on the store and pass in the content.
  console.log('here is content....', content)
  const request = store.add({ content: content });
  console.log('request to add to DB made...')
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

//  Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('text', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('text');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

// document.addEventListener('load', initdb())
initdb();


