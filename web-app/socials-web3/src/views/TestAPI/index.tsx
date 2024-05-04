"use client";

import { AccountAPI, CommunityAPI, PostsAPI } from "@/services/apis";

export default function TestAPI() {
  return (
    <div className="">
      <h1> -------- Account API ------------ </h1>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => AccountAPI.getAllUser()}
      >
        Test Get User
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => AccountAPI.getUserByNFT("1")}
      >
        Test Get User By NFT
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() =>
          AccountAPI.createAccount("lonngdo", "12345678", "Long Đỗ")
        }
      >
        Create User
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => AccountAPI.updateUserNFT("dungnguyen1", "2")}
      >
        Update User NFT
      </div>

      <h1> ------------ Community API ---------------- </h1>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => CommunityAPI.getAllCommunity()}
      >
        Test Get Community
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => CommunityAPI.getCommunityBySlug("the-one-team")}
      >
        Test Get Community By Slug
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() =>
          CommunityAPI.createCommunity(
            `Test community ${new Date().getTime()}`,
            "To the moon !!!"
          )
        }
      >
        Test Create Community
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() =>
          CommunityAPI.updateCommunity("the-one-team", {
            description: "To the moon " + new Date().getTime(),
          })
        }
      >
        Test Update Community
      </div>
      <h1> ------------ Posts API ---------------- </h1>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => PostsAPI.getAllPosts()}
      >
        Test Get AllPosts
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() =>
          PostsAPI.getPostById("05f19ee5-9eaf-41f1-84b6-ab5dee2de14b")
        }
      >
        Test Get Post By ID
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() =>
          PostsAPI.createPost(
            `Onchain is new Online ${new Date().getTime()}`,
            "dungnguyen",
            `"Proudly presenting 𝐕𝐢𝐜𝐭𝐢𝐨𝐧 𝐖𝐨𝐫𝐥𝐝 𝐖𝐢𝐝𝐞 𝐂𝐡𝐚𝐢𝐧 🌐 - reimagining everything you thought you knew. Scale beyond limits, enhance security, embrace liberty, foster win-win for all, and unlock collective value creation."`
          )
        }
      >
        Test Create Post
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => PostsAPI.updatePost("05f19ee5-9eaf-41f1-84b6-ab5dee2de14b", {
            title: `Onchain is new Online ${new Date().getTime()}`
        })}
      >
        Test Update Community
      </div>
    </div>
  );
}
