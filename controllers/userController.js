const User = require("../models/userModel");
const { signToken } = require("../services/jwtService");
const { sendingEmail } = require("../services/sendingEmail");
const { nanoid } = require("nanoid");

exports.register = async (req, res, next) => {
  req.body.verificationToken = nanoid();

  const { email, verificationToken } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      await User.deleteOne({ _id: user.id });
    }
    await User.create(req.body);

    await sendingEmail(verificationToken, email);

    res.status(201).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  const { _id, email } = req.user;

  try {
    await User.findByIdAndUpdate(_id, {
      verificationToken: null,
      verify: true,
    });
    await sendingEmail(null, email);
    res.status(200).json({ email });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { name, email, id } = req.user;
  try {
    // const user = req.user;
    const token = signToken(id);
    await User.findByIdAndUpdate({ _id: id }, { token });

    res.status(200).json({ user: { name, email }, token });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  const { name, email } = req.user;
  try {
    res.status(200).json({ user: { name, email } });
  } catch (error) {
    next(error);
  }
};

// exports.resendVerificationRequest = async (req, res, next) => {
//   const { verificationToken, email } = req.user;

//   try {
//     await sendingEmail(verificationToken, email);
//     res.status(200).json({ message: "Verification email sent" });
//   } catch (error) {
//     next(error);
//   }
// };
