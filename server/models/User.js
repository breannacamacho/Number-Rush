const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match a valid email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  scores: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz', // Reference to Quiz model for multiple quiz attempts
    },
  ],
  profilePhoto: {
    type: String, // Path or URL to the uploaded profile photo
  },
});

// Hash password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check if the entered password matches the hashed password in the database
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;