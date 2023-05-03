import responseHandler from "../handlers/response.handler.js";

const checkToken = async (req, res) => {
  try {
    const { username } = req.user;
    responseHandler.ok(res, { username: username });
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};
export default { checkToken };
