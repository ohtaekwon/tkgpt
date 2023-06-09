import { handleError } from "lib/utils/helpers";
import privateClient from "../client/private.client";
import publicClient from "../client/public.client";
import { UserResponse, checkTokenResponse } from "lib/utils/types";

const userApiRoutes = {
  signUp: "users/signup",
  signIn: "users/signin",
  checkToken: "users/check-token",
};

const userApis = {
  signup: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response: UserResponse = await publicClient.post(
        userApiRoutes.signUp,
        {
          username,
          password,
        }
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  signIn: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response: UserResponse = await publicClient.post(
        userApiRoutes.signIn,
        {
          username,
          password,
        }
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
  checkToken: async () => {
    try {
      const response: checkTokenResponse = await privateClient.get(
        userApiRoutes.checkToken
      );
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};

export default userApis;
