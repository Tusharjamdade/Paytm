const mongoose = require("mongoose");
const { passthrough } = require("./zod/signinZod");

mongoose.connect(
  "mongodb+srv://tusharjamdade:100xDevs@cluster0.sfgxctn.mongodb.net/PayTM"
);
const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    require: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    require: true,
    maxLength: 30,
  },
});


const Users = mongoose.model("Users", userSchema);



Users.create({
    username:"tusharjamdade@gmail.com",
    firstName:"Tushar",
    lastName:"Jamdade",
    password:"Tushar@124"
})