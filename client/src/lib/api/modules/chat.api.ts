import privateClient from "lib/api/client/private.client";

const chatApiRoutes = {
  chats: "chats",
};

const chatApis = {
  completion: async ({ prompt }: { prompt: string }) => {
    try {
      console.info(`tkgpt에 요청을 보내는 중입니다.`);
      const response = await privateClient.post(chatApiRoutes.chats, {
        prompt,
      });
      return { response };
    } catch (error) {
      return error;
    }
  },
};
export default chatApis;
