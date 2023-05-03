const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const error = (re, message) =>
  responseWithData(res, 500, {
    status: 500,
    message,
  });

const badRequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

const ok = (res, data) => responseWithData(res, 200, data);

const unauthorize = (res, message) =>
  responseWithData(res, 401, {
    status: 401,
    message,
  });

const notFound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource를 찾지 못했습니다.",
  });

const created = (res, data) => responseWithData(res, 201, data);

export default {
  error,
  badRequest,
  ok,
  unauthorize,
  notFound,
  created,
};
