import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userApiRoutes = {
  signUp: "user/signup",
  signIn: "user/signin",
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
      const response = await publicClient.post(userApiRoutes.signUp, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
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
      const response = await publicClient.post(userApiRoutes.signIn, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return error;
    }
  },
  checkToken: async () => {
    try {
      const response = await privateClient.get(userApiRoutes.checkToken);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApis;
