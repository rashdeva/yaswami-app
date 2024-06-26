import { create } from "zustand";

export interface UserData {
  id?: number;
  telegramId?: number | null;
  firstName?: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  thumbnailUrl?: string;
  allowsWriteToPm?: boolean;
}

export interface UserStore {
  user: UserData;
  setUser: (userData: UserData) => void;
  getUserName: () => string;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    username: undefined,
    languageCode: undefined,
    isPremium: undefined
  },
  getUserName: () => {
    const hasFirstname = get().user.firstName !== "";
    const hasLastname = get().user.lastName !== "";

    if (!hasFirstname && !hasLastname) {
      return get().user.username || "";
    }

    return `${get().user.firstName} ${get().user.lastName}`;
  },
  setUser: (userData) => {
    console.log(userData)
    set({
      user: userData,
    });
  },
}));
