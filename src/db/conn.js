"use strict"
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/DatabaseRigisration")
  .then(() => {
    console.log("Connection Succesful");
  })
  .catch((e) => {
    console.log("Connection fail");
  });
