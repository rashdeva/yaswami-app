import { User } from "@tma.js/sdk";

export type UserDto = {
  username?: string;
  first_name: string;
  last_name?: string;
  id: number;
  telegram_id: number;
  photo?: string;
  language_code?: string;
};

export type ParticipantDto = {
  user_id: number;
  event_id: number;
};

export type UserModel = User;
export type ParticipantModel = {
    userId: number;
    eventId: number;
}
