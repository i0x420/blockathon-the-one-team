"use client";

import { createAccount, getAllUser, getUserByNFT, updateUserNFT } from "@/apis/accounts";

export default function TestAPI() {

  return (
    <div className="">
        <div className="p-4 bg-green-500 border hover:bg-slate-500" onClick={() => getAllUser()}>
            Test Get User
        </div>
        <div className="p-4 bg-green-500 border hover:bg-slate-500" onClick={() => getUserByNFT("1")}>
            Test Get User By NFT
        </div>
        <div className="p-4 bg-green-500 border hover:bg-slate-500" onClick={() => createAccount("dungnguyen1", "123456", "Dũng 2")}>
            Create User 
        </div>
        <div className="p-4 bg-green-500 border hover:bg-slate-500" onClick={() => updateUserNFT("dungnguyen1", "2")}>
            Update User NFT 
        </div>
    </div>
  );
}
