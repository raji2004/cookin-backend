const {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} = require('firebase/firestore');

const { collectionName, database, firebaseQuery, search } = require('../config/database.config')


exports.Signup = async (req, res) => {
  const { name, email, password } = req.body
  try {

    const data = await search({
      collectionName: "Cookin",
      qattribute: 'email',
      qtype: '==',
      qvalue: email
    })
    if (!data) {
      const user = await addDoc(collectionName('Cookin'), { name, email, password })
      res.send("succesful")
    } else {
      res.send("email already exist")
    }

    res.send(data)

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await search({
      collectionName: "Cookin",
      qattribute: 'email',
      qtype: '==',
      qvalue: email
    })
    if (user && user[0].password == password) {
      res.send(user[0])
    } else {
      console.log(user)
      res.send("email or password incorrect")
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


