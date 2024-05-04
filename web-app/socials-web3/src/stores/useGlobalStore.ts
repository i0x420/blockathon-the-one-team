import { sample } from "lodash";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//default avatar
export const imageUrls = [
  "/images/avatarDefault/c98-default.png",
];

interface GlobalState {
  isGlobalMounted: boolean;
  setIsGlobalMounted: (isGlobalMounted: boolean) => void;

  avatarDefault: string;
  setAvatarDefault: (avatarDefault: string) => void;
}

const notPersistStates = ["isGlobalMounted"];

const STATE_DEFAULT = {
  avatarDefault: sample(imageUrls),
  isGlobalMounted: false,
};

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        ...STATE_DEFAULT,

        // Set state
        setAvatarDefault: (avatarDefault) => set({ avatarDefault }),
        setIsGlobalMounted: (isGlobalMounted) => set({ isGlobalMounted }),
      }),
      {
        name: "global",
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
