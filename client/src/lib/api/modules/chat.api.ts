import privateClient from "lib/api/client/private.client";
import { handleError } from "lib/utils/helpers";

const chatApiRoutes = {
  chats: "chats",
};

const chatApis = {
  completion: async ({ prompt }: { prompt: string }) => {
    try {
      console.info(`tkgpt에 요청을 보내는 중입니다.`);
      const response: any = await privateClient.post(chatApiRoutes.chats, {
        prompt,
      });
      return { response };
    } catch (error) {
      const { code, message } = handleError(error);
      return { error: { code, message } };
    }
  },
};
export default chatApis;
