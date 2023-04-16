import { ChatParams } from './model/openAIModel';
import axios from 'axios';
//import { ChatGPTAPI } from 'chatgpt';
import { isArray } from 'xe-utils';

enum Api {
  Chat = '/chat/completions',
}

//import { generatePayload, parseOpenAIStream } from '/@/utils/openAI';
// #vercel-disable-blocks
//import { fetch, ProxyAgent } from 'undici';
// #vercel-end

const apiKey = import.meta.env.OPENAI_API_KEY;
//const httpsProxy = import.meta.env.HTTPS_PROXY;
const baseUrl = (import.meta.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1')
  .trim()
  .replace(/\/$/, '');

export async function chatGPTStream(
  messages: string | ChatParams[],
  signal: AbortSignal,
): Promise<Response> {
  console.log(messages);
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        apiKey ? apiKey : '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'
      }`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: isArray(messages) ? messages : [{ role: 'user', content: messages }],
      temperature: 0.6,
      stream: true,
    }),
    signal: signal,
  };

  // #vercel-disable-blocks
  // if (httpsProxy) {
  //   initOptions['dispatcher'] = new ProxyAgent(httpsProxy);
  // }
  // #vercel-end

  // @ts-ignore
  const response = (await fetch(`https://aiassist.sytes.net/generate`, initOptions)) as Response;
  //const response = (await fetch(`${baseUrl}${Api.Chat}`, initOptions)) as Response;
  return response; //new Response(parseOpenAIStream(response));
}

/**
 * @description: request chat completions
 */
// function reqChatApi(params: ChatParams, mode: ErrorMessageMode = 'none') {
//   console.log(params);
//   return defHttp.post<ChatResult>(
//     {
//       url: Api.Chat,
//       params,
//     },
//     {
//       errorMessageMode: mode,
//     },
//   );
// }

/**
 * @description: chat completions api
 */
export async function chatGPT(messages: string | ChatParams[]): Promise<ChatParams> {
  //try {
  // const data = await reqChatApi({
  //   role: 'user',
  //   content: content,
  // });
  // const api = new ChatGPTAPI({
  //   apiKey: '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',
  // });

  // const res = await api.sendMessage(content);
  console.log('chatGPT', messages);

  const data = await axios.post(
    `${baseUrl}${Api.Chat}`,
    {
      //temperature: 0.6,
      model: 'gpt-3.5-turbo',
      messages: isArray(messages) ? messages : [{ role: 'user', content: messages }],
    },
    {
      timeout: 300000,
      headers: {
        Authorization: 'Bearer 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',
        'Content-Type': 'application/json',
      },
    },
  );

  //console.log(data);
  return data.data.choices[0].message;
  // } catch (e) {
  //   console.log(e);
  // }
  // return '';
}
