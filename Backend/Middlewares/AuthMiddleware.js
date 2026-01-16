const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ status: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ status: false });
    }

    // 🔥 IMPORTANT PART
    req.user = {
      id: user._id,
      username: user.username,
    };

    next(); // 🔥 route ko control do
  } catch (error) {
    return res.status(401).json({ status: false });
  }
};
