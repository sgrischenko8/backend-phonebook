const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../environment/.env" });

exports.sendingEmail = async (verificationToken, mail) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_HOST,
    port: process.env.MAILGUN_PORT,
    secure: false,
    auth: {
      user: process.env.MAILGUN_USERNAME,
      pass: process.env.MAILGUN_PASSWORD,
    },
  });

  const emailConfig = {
    from: process.env.EMAIL_SENDER,
    to: mail,
    subject: "Verifying email",
    text: verificationToken
      ? `This message send to verify your email address for registrtation in Phonebook app. Please, click to verify: ${process.env.BASE_API}/users/verify/${verificationToken}`
      : "You successfully register in Phonebook app. Please login to use the app",
  };

  try {
    await transporter.sendMail(emailConfig);
  } catch (error) {
    console.log(error.message);
  }
};
