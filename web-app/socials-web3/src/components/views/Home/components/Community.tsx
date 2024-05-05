"use client";
import { CommunityAPI, PostsAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { CreateCommunityButton } from "./CreateCommunityModal";
import Link from "next/link";

export const Community = () => {
  const { userInfo } = useUserStore();
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    fetchCommunity();
  }, [userInfo]);

  const fetchCommunity = async () => {
    // if (!userInfo) return;
    const { community, error } = await CommunityAPI.getAllCommunity();

    if (community.length) {
      setCommunityList(community);
    }
  };

  const refresh = async () => {
    await fetchCommunity();
  };

  return (
    <div className="flex gap-2 flex-col pt-6 mx-2">
      {communityList.map((p, index) => {
        return (
          <div className="flex gap-1 flex-col px-2 py-1 cursor-pointer">
            <div className="flex">
              <img
                className="rounded w-8 h-8 mr-2"
                alt={p.author}
                srcSet={`https://picsum.photos/80/80?random=${index}`}
              />
              <div className="text-bold text-base hover:text-[#F28E28] truncate">
                <Link href={`/community/${p.slug}`}>{p.name}</Link>
              </div>
            </div>

            {/* <div className="">
              <img
                className="rounded-full w-12 h-12"
                alt={p.author}
                srcSet={`https://picsum.photos/80/80?random=${index}`}
              />
              Author:{" "}
              <span className="text-[#F28E28] cursor-pointer">{p.author}</span>
            </div>
            <div>
              Type: {p.premium && <span className="text-orange">Premium</span>}
              {p.community && (
                <span className="text-yellow">{p.community}</span>
              )}
            </div>
            <div className="text-bold text-lg">{p.title}</div>
            <div className="">{p.content}</div>
            <div className="w-full h-40">
              <img
                className="w-full h-full object-contain"
                alt={p.author}
                src={`https://picsum.photos/800/360?random=${index}`}

              />
            </div> */}
          </div>
        );
      })}
    </div>
  );
};
