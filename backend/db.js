const mongoose = require("mongoose");

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

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  Users,
  Account,
};
