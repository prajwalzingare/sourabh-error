"use strict";
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin-prajwal:prajwal12@cluster0.ox7k5.mongodb.net/todolistDB"
  )
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((e) => {
    console.log("Connection fail");
  });
