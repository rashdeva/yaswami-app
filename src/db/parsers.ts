import { ParticipantDto, ParticipantModel, UserDto, UserModel } from "./models";

export const parseUser = (user: UserDto): UserModel => {
  return {
    firstName: user.first_name || "",
    id: user.telegram_id || 0,
    lastName: user.last_name,
    languageCode: user.language_code,
    photoUrl: user.photo,
    username: user.username,
  };
};

export const parseParticipant = (participant: ParticipantDto): ParticipantModel => {
  return {
    userId: participant.user_id,
    eventId: participant.event_id
  };
};
