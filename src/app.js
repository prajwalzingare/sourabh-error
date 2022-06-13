const express = require("express")
const app = express();
'module.exports = app;'
const dotenv = require("dotenv").config();

require("./db/conn")
const  bcryptjs = require("bcryptjs");


const Registri = require("./modules/module");

const path = require("path");
const hbs = require("hbs");
const async = require("hbs/lib/async");


const public_path = path.join(__dirname, "../public")
app.use(express.static(public_path))
const views_path = path.join(__dirname, "../templets/views")
const hbs_path = path.join(__dirname, "../templets/partials")

// befoure send data with the help of post 
// You must tell your browser this Two methods
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//  

app.set('view engine',"hbs")
app.set("views", views_path)
hbs.registerPartials(hbs_path)

app.get("/", (req,res)=>{
    res.render("index")
});
app.get("/register", (req,res)=>{
    res.render("register")
});
//  create a new user in our database
app.post("/register", async(req,res)=>{
 try{
//   console.log(req.body.Name)
//   res.send(req.body.Name)
const password = req.body.Password;
const Cpassw = req.body.Cpassword;

if(password === Cpassw){
    const nextprocess = new Registri({
        Name: req.body.Name,
        Phone:req.body.Phone,
        Gmails:req.body.Gmails,
        Password: req.body.Password,
        Cpassword:req.body.Cpassword
    })

    const regi = await nextprocess.save();
    res.status(201).render("index");
    


}else{
    res.send("invalid")
}

 }catch(error){
  res.status(400).send(error)
 }

});

// login
app.get("/login", (req,res)=>{
    res.render("login")
})

app.post("/login", async(req,res)=>{
try{
const email = req.body.emaill;
const passwords = req.body.passwordd;
// console.log(`${email} and password is ${passwords}`)
const useremail = await Registri.findOne({Gmails:email});

// const isMatch = await bcryptjs.compare(passwords, useremail.Password)


if(useremail.Password === passwords ){
    res.status(201).render("index")
}else{
    res.send("invalid login Details")
}

}
 catch(error){
        res.status(400).send("invalid Email")
    }

})

const ports = process.env.PORT || 3000

app.listen( ports ,()=>{
    console.log("The server is running on port 3000")
})
