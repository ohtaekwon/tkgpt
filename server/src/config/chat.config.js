import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openApi = new OpenAIApi(openAIConfig);

export default { openApi };
