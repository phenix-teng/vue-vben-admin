import { ChatParams } from '/@/api/model/openAIModel';

export interface PaperInfo {
  current: number;
  messages: ChatParams[];
  subject: string;
  outline: string;
  body: string;
}
