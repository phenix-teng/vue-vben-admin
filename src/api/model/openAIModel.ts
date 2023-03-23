//import { BasicInterfaceResult, BasicRequestParams } from './baseModel';

export interface ChatParams {
  role: string;
  content: string;
}

export interface ChatResult {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice_t[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface Choice_t {
  index: number;
  finish_reason: string;
  message: {
    role: string;
    content: string;
  };
}
