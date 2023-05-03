import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";

const tokenDecode = (req) => {
  try {
    const bearer = req.headers["authorization"];

    if (bearer) {
      const token = bearer.split(" ")[1];
      return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const tokenAuth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) responseHandler.unauthorize(res, "토큰이 없습니다.");

  const user = await User.findById(tokenDecoded.data);

  if (!user) responseHandler.unauthorize(res, "토큰이 유효하지 않습니다.");

  req.user = user;

  next();
};

export default { tokenAuth, tokenDecode };
