import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";

const userSignUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await User.findOne({ username });

    if (checkUser) {
      return responseHandler.badRequest(res, "username이 이미 존재합니다.");
    }

    const user = new User({ username });

    // user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24H" }
    );

    responseHandler.created(res, {
      token,
      username,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

const userSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select(
      "username password salt id"
    );

    if (!user) {
      return responseHandler.badRequest(res, "유저 정보를 찾을 수 없습니다.");
    }
    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "비밀번호가 맞지 않습니다.");
    }

    const token = jsonwebtoken.sign(
      { data: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24H" }
    );

    responseHandler.created(res, {
      token,
      username,
      id: user._id,
    });
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

export default { userSignUp, userSignIn };
