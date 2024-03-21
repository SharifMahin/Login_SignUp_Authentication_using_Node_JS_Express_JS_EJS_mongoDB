const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const LoginModel = require("./config");

const app = express();
const port = 3000;

//convert data to Json format
app.use(express.urlencoded({extended: false}))
app.use(express.json());


//here,declared to server that use ejs as a view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login");
})

app.get('/signup', (req, res) => {
    res.render("signup");
})

//register user
app.post('/signup', async (req,res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const userData = await LoginModel.insertMany(data);
    console.log(userData);

})

app.listen(port, ()=>{
    console.log(`listening the port at http://localhost:${port}`);
});