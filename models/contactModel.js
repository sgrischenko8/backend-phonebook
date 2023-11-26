const mongoose = require("mongoose");

const crypto = require("crypto");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    avatarURL: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);
contactSchema.pre("save", async function (next) {
  if (this.isNew) {
    const phoneHash = crypto.createHash("md5").update(this.phone).digest("hex");
    this.avatarURL = `https://www.gravatar.com/avatar/${phoneHash}.jpg?d=robohash`;
  }

  next();
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
