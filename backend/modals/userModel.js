const mongoose = require("mongoose");
// npm install bcrypt - a library to hash the passwords
const bcrypt = require("bcrypt");
// validation pacakage
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// mongoose provides statics methods to signup with ease - [schema].statics.[function]
userSchema.statics.signup = async function (email, password) {
  //validation using package - validator
  validationEmailPass(email, password);

  //first check if it exists =
  const exists = await this.findOne({ email }); //"this" cannot work with lambda functions

  if (exists) throw Error("Email already exists");

  // salt - to keep data safe, a random string is also added after email or password
  // like - emailidasdasdasdasd to add extra layer of security
  //if hacker figured out one password, they don't get other same same ones
  //cuz passwords of lots of user can be same

  //first create a salt -
  const salt = await bcrypt.genSalt(10); //10 is no. of rounds, more the rounds, more complex the hash but also will take more time to generate
  //then make a hash of password + salt
  const hash = await bcrypt.hash(password, salt);
  //create the user signup with email and password hash
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  //validate -
  if (!email || !password) {
    throw Error("Email or password field is empty");
  }

  //get the user if exists from db
  const user = await this.findOne({ email });
  
  if (!user) {
    throw Error("The email address is not registered");
  }

  //if it exists, then we will match the stored password hash with the user provided password hash
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password");

  return user;
};

const validationEmailPass = (email, password) => {
  if (!email || !password) {
    throw Error("Either email or password field is empty");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "The password must include 1 letter, 1 number and special character"
    );
  }
};

module.exports = mongoose.model("User", userSchema);
