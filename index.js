const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const LoginModel = require("./config");
const templates = path.join(__dirname,'./templates/views')

const app = express();
const port = 3000;

//convert data to Json format
app.use(express.urlencoded({extended: false}))
//app.use(express.json());


//here,declared to server that use ejs as a view engine
app.set('view engine', 'ejs');
app.set("views",templates);
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
//check the data exist or not
    const existData = await LoginModel.findOne({ name:data.name});
     if(existData){
        res.send("The Username already exist.please choose another one");
     }else{ 
        //hashing password using bcrypt
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password,saltrounds );
        data.password = hashedPassword;
        const userData = await LoginModel.insertMany(data);
        console.log(userData);
        res.send("Succesfully SignUp");
     }
})

//login user
app.post('/login', async (req,res)=>{
//check the data 
    try{
        const check = await LoginModel.findOne({ name:req.body.username});
        if(!check){
           return res.send("Invalid Username");
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
        if(!isPasswordMatch){
            return res.send("Invalid password");
        }
        else{
            return res.render("home");
        }
    }catch{
    res.send("User info does not exit ")        
    }
});
app.listen(port, ()=>{
    console.log(`listening the port at http://localhost:${port}`);
});