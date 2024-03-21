const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");
connect.then(() => console.log("connection successful"))
.catch((err) => console.log(err));

// Create Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//create a module
const LoginModel = new mongoose.model("users", LoginSchema);

module.exports = LoginModel;
