import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import tokenController from "../controllers/token.controller.js";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("username은 필수입니다.")
    .isLength({ min: 6 })
    .withMessage("username은 최소 6글자 이상이어야 합니다.")
    .isLength({ min: 15 })
    .withMessage("username은 최대 15글자입니다."),
  body("password")
    .exists()
    .withMessage("password는 필수입니다.")
    .isLength({ min: 8 })
    .withMessage("password는 8글자 이상이어야 합니다. "),
  requestHandler.validate,
  userController.userRegister
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("username은 필수 입니다.")
    .isLength({ min: 6 })
    .withMessage("username은 6글자 이상이여야 합니다."),
  body("password")
    .exists()
    .withMessage("password는 필수입니다.")
    .isLength({ min: 8 })
    .withMessage("password는 8글자 이상이여야 합니다."),
  requestHandler.validate,
  userController.userSignIn
);

router.get(
  "/check-token",
  tokenMiddleware.tokenAuth,
  tokenController.checkToken
);

export default rotuer;
