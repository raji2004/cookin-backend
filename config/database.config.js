const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, getDocs, where, getDoc, doc } = require('firebase/firestore');

require("dotenv").config()


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
console.log("the one")

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const collectionName = (name) => collection(database, name)
const firebaseQuery = (name, where) => query(collectionName(name), where)

const search = async ({ collectionName, qattribute, qtype, qvalue }) => {
  const q = await getDocs(firebaseQuery(collectionName, where(qattribute, qtype, qvalue)))
  if (!q.empty) {
    const list = []
    q.forEach(doc => {
      list.push({ id: doc.id, ...doc.data() })
    })
    return list
  } else {
    return "empty"
  }
}

const searchById = async (collection, id) => await getDoc(doc(collectionName(collection), id))

module.exports = {
  database,
  collectionName,
  firebaseQuery,
  search,
  searchById
}