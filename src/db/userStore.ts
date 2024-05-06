import { create } from "zustand";

export interface UserData {
  id?: number;
  telegram_id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  thumbnail_url?: string;
}

export interface UserStore {
  data: UserData;
  setData: (data: UserData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  data: {
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    username: undefined,
    language_code: undefined,
  },
  setData: (data) => {
    set({
      data,
    });
  },
}));
