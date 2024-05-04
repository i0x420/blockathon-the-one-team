"use client";
import { PostsAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

export const Feed = () => {
  const { userInfo } = useUserStore();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  const fetchPosts = async () => {
    // if (!userInfo) return;
    const { posts, error } = await PostsAPI.fetchNewFeed({
      username: userInfo?.username,
      community: [],
    });
    console.log({ feed: posts});
    

    if (posts.length) {
      setPosts(posts);
    }
  };

  return (
    <div className="flex gap-6 flex-col mt-8">
      {posts.map((p, index) => {
        return (
          <div className="flex border gap-3 flex-col px-2 py-4 relative">
            <div className="flex">
              <img
                className="rounded-full w-12 h-12"
                alt={p.author}
                srcSet={`https://picsum.photos/80/80?random=${index}`}
              />
              <div>
                Author:{" "}
                <span className="text-[#F28E28] cursor-pointer">
                  {p.author}
                </span>
              </div>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 flex-col">
              {p.community && (
                <div className="border-[#2BBFE2] text-[#2BBFE2] border px-1">
                  <span className="text-[#2BBFE2]">{p.community}</span>
                </div>
              )}
              {p.premium && (
                <div className="border-[#F28E28] text-[#F28E28] border px-1">
                  {<span className="text-orange">Premium</span>}
                </div>
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
            </div>
          </div>
        );
      })}
    </div>
  );
};
