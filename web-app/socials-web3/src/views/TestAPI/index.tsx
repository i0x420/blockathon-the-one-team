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
        onClick={() => AccountAPI.createAccount("dungnguyen1", "123456", "Dũng 2")}
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
        onClick={() => CommunityAPI.createCommunity(`Test community ${new Date().getTime()}`, "To the moon !!!")}
      >
        Test Create Community
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => CommunityAPI.updateCommunity("the-one-team", {
            description: "To the moon " + new Date().getTime()
        })}
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
      {/* <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => getCommunityBySlug("the-one-team")}
      >
        Test Get Community By Slug
      </div> */}
      {/* <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => createCommunity(`Test community ${new Date().getTime()}`, "To the moon !!!")}
      >
        Test Create Community
      </div> */}
      {/* <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => updateCommunity("the-one-team", {
            description: "To the moon " + new Date().getTime()
        })}
      >
        Test Update Community
      </div> */}

    </div>
  );
}
