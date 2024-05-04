"use client";

import {
  createAccount,
  getAllUser,
  getUserByNFT,
  updateUserNFT,
} from "@/apis/accounts";
import { createCommunity, getAllCommunity, getCommunityBySlug, updateCommunity } from "@/apis/community";
import { getAllPosts } from "@/apis/posts";

export default function TestAPI() {
  return (
    <div className="">
      <h1> -------- Account API ------------ </h1>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => getAllUser()}
      >
        Test Get User
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => getUserByNFT("1")}
      >
        Test Get User By NFT
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => createAccount("dungnguyen1", "123456", "Dũng 2")}
      >
        Create User
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => updateUserNFT("dungnguyen1", "2")}
      >
        Update User NFT
      </div>

      <h1> ------------ Community API ---------------- </h1>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => getAllCommunity()}
      >
        Test Get Community
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => getCommunityBySlug("the-one-team")}
      >
        Test Get Community By Slug
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => createCommunity(`Test community ${new Date().getTime()}`, "To the moon !!!")}
      >
        Test Create Community
      </div>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => updateCommunity("the-one-team", {
            description: "To the moon " + new Date().getTime()
        })}
      >
        Test Update Community
      </div>
      <h1> ------------ Posts API ---------------- </h1>
      <div
        className="p-4 bg-green-500 border hover:bg-slate-500"
        onClick={() => getAllPosts()}
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
