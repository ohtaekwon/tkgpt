import chatGPT from "../config/chat.config.js";
import responseHandler from "../handlers/response.handler.js";

const chatCompletion = async (req, res) => {
  try {
    const { prompt } = req.body;

    const answer = await chatGPT.openApi.createChatCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 3000,
    });

    const text = answer.data.choices[0].text;

    responseHandler.ok(res, { text });
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

export default { chatCompletion };
