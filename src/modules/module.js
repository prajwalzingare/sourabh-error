
const mongoose = require("mongoose");
const  bcryptjs = require("bcryptjs");

const MongooseSchema = new mongoose.Schema({
 Name:{
        type:String,
        required:true
    } ,

Gmails:{
     type:String,
     required:true,
     unique:true  
 },
 
 Phone:{
     type:Number,
     required:true,
     unique:true,
     min:11
 },

 Password:{
     type:String,
     required:true
 },

 Cpassword:{
     type:String,
     required:true
 }
});

MongooseSchema.pre("save", async function(next){
    if(this.isModified("Password")){
        this.Password = await bcryptjs.hash(this.Password, 10);
        console.log(`The current password is ${this.Password}`)

        this.Cpassword = undefined;
    }
    next();
})



const Registri = new mongoose.model("Registri",MongooseSchema)

module.exports = Registri;