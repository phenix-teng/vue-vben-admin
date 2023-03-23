import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { ChatParams, ChatResult, Choice_t } from './model/openAIModel';
import axios from 'axios';
import { ChatGPTAPI } from 'chatgpt';
import { isArray } from 'xe-utils';

enum Api {
  Chat = '/chat/completions',
}

/**
 * @description: request chat completions
 */
function reqChatApi(params: ChatParams, mode: ErrorMessageMode = 'none') {
  console.log(params);
  return defHttp.post<ChatResult>(
    {
      url: Api.Chat,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

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
    'https://api.openai.com/v1/chat/completions',
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
