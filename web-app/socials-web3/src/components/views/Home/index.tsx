"use client";

import { useUserStore } from "@/stores/useUserStore";
import { Community } from "./components/Community";
import { SendVibeButton } from "./components/CreatePostModal";
import { Feed } from "./components/Feed";
import bannerImage from "../../../assets/images/banner.jpg";
import SuggestedUser from "./components/SuggestedUser";
import SuggestedEvent from "./components/SuggestedEvent";

export default function Home() {
  const { userInfo } = useUserStore();

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="relative border-r">
          <div className="sticky top-header">
            <div className="text-text-secondary px-4 py-4">
              Recommended Community
            </div>
            <Community />
          </div>
        </div>

        <div className="col-span-3">
          {/* banner */}
          <img
            className="w-full aspect-[4/1]"
            src={bannerImage?.src}
            alt="banner"
          />

          {/* list post */}
          <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-[1200px]">
            <div className="pl-6 col-span-2">
              <div className="flex justify-between items-center border-b pb-4">
                {userInfo?.username && <SendVibeButton />}
                {/* <UploadPost /> */}
              </div>
              <Feed />
            </div>

            <div className="relative">
              <div className="sticky top-header">
                <div className="bg-background-secondary rounded-lg p-4 mb-4">
                  <div className="text-text-secondary mb-4">
                    Suggested for you
                  </div>
                  <SuggestedUser />
                </div>

                <div className="bg-background-secondary rounded-lg p-4">
                  <div className="text-text-secondary mb-4">Events</div>
                  <SuggestedEvent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
