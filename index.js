const express = require("express");

const { readdirSync } = require("fs");
const dotenv = require('dotenv')
dotenv.config();
const app = express();


PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.send('working')
})

//get db

// get users



// app.use(passport.initialize());


// app.use(passport.session());



// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


readdirSync("./routes").map((path) =>
    app.use("/", require(`./routes/${path}`))
);


app.listen(PORT, () => {
    console.log(`app is listening on port http://localhost:${PORT}`)
})