import { ChatParams } from '/@/api/model/openAIModel';

export interface PaperInfo {
  messages: ChatParams[];
  subject: string;
  outline: string;
  body: string;
}
