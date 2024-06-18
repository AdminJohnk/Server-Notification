import { NotiEnum } from './notificationType';

export interface IUserInfo {
  _id: string;
  id_incr: number;
  name: string;
  email: string;
  role: string[];
  last_online: string;
  phone_number: string;
  user_image: string;
  cover_image: string;
  tags: string[];
  alias: string;
  about: string;
}

export interface INotiMessage {
  type: NotiEnum;
  kind: string;
  content: string;
  sender: string;
  receiver?: string;
  createAt: string;
  options: { post?: string; friend?: string };
}

export interface ISocketCall {
  author: IUserInfo;
  user_id: string;
  user_name: string;
  user_image: string;
  members: IUserInfo[];
  token: string;
  first_call: boolean;
  type: 'missed' | 'ended';
  typeofConversation: 'private' | 'group';
  conversation_id: string;
  conversation_name: string;
}
