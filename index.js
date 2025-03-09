const express = require("express")
const app = express();
const cors = require("cors")
const signup = require('./signup')
const login = require('./login')

//middleware
app.use(cors());
app.use(express.json());

app.use('/auth/signup',signup )
app.use('/auth/login',login)


app.listen(4000, ()=>{
    console.log("Server has started on port 4000")
})