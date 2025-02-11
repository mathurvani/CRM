const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName : {type : String},
    lastName : {type : String},
    password : {type : String},
    token:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
