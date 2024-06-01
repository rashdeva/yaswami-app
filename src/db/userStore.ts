import { create } from "zustand";

export interface UserData {
  id?: number;
  telegram_id?: number | null;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  thumbnail_url?: string;
}

export interface UserStore {
  user: UserData;
  setUser: (userData: UserData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    username: undefined,
    language_code: undefined,
  },
  setUser: (userData) => {
    set({
      user: userData,
    });
  },
}));
