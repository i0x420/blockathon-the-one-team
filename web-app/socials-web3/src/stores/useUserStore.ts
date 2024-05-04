import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  userInfo: any;
  setUserInfo: (info: any) => void;
}

const notPersistStates = [];

const STATE_DEFAULT = {
  userInfo: null,
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        ...STATE_DEFAULT,

        // Set state
        setUserInfo: (userInfo) => set({ userInfo }),
      }),
      {
        name: "user",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !notPersistStates.includes(key)
            )
          ),
      }
    )
  )
);
