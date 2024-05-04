"use client";

import { useUserStore } from "@/stores/useUserStore";
import { Feed } from "../Home/components/Feed";
import { Community } from "../Home/components/Community";
import { SendVibeButton } from "../Home/components/CreatePostModal";

export default function CommunityPage({ community }: any) {
  const { userInfo } = useUserStore();

  console.log({ community });

  return (
    <>
      <div className="flex gap-6">
        <div className="w-[20%]">
          <div className="text-text-secondary px-4 py-4">
            Recommended Community
          </div>
          <Community />
        </div>
        <div className="w-[80%] border-l">
          <div className="w-full h-80">
            <img
              className="w-full h-full object-cover"
              alt={community?.name}
              src={`https://picsum.photos/800/360?random=126`}
            />
          </div>
          <div className="w-full  pl-6">
            <div className="flex justify-between items-center w-[75%] flex-col">
              <div className="flex justify-between items-center w-full">
                <div className="text-text-secondary px-4 py-4">Feed</div>
                <div>
                  {userInfo?.username && (
                    <SendVibeButton communitySlug={community?.slug} />
                  )}
                </div>
              </div>
              <Feed communitySlug={community?.slug} />
            </div>
            <div className="w-[75%]">
              <div className="text-text-secondary px-4 py-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
