/**
 * 1. Get Account or Login
 * 2. Create
 * 3. Update
 */

import { supabase } from "./clients";

const getAllUser = async () => {
  const { data: accounts, error } = await supabase.from("accounts").select("*");
  console.log("getAllUser", { accounts, error });

  return accounts;
};
const getUserByNFT = async (id: string) => {
  const { data: userInfo, error } = await supabase
    .from("accounts")
    .select()
    .eq("nftid", id);
  console.log("getUserByNFT", { userInfo, error });

  return { userInfo, error };
};

const checkIsExits = async (username: string, nftid: string) => {
  const { data: userInfo, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("username", username);

  console.log("checkIsExits", { userInfo, error });
  if (userInfo.length) {
    return true;
  }

  return false;
};

const createAccount = async (
  username: string,
  password: string,
  fullname: string
) => {
  const isExits = await checkIsExits(username, password);
  if (isExits) {
    console.log("createAccount", { userInfo: [], error: "User is exits" });
    return { userInfo: [], error: "User is exits" };
  }

  const { data: userInfo, error } = await supabase
    .from("accounts")
    .insert([
      {
        username,
        password,
        fullname,
        nftid: "",
        meta: {
          community: [],
        },
        roles: [
          {
            roleName: "communityOwner",
            name: "Community Onwer",
            communityList: [],
          },
        ],
      },
    ])
    .select();
  console.log("createAccount", { userInfo, error });

  return { userInfo, error };
};

const updateUserNFT = async (username: string, nftid: string) => {
  const { data: userInfo, error } = await supabase
    .from("accounts")
    .update({
      nftid: nftid,
    })
    .eq("username", username)
    .select();
  console.log("updateUserNFT", { userInfo, error });
  return { userInfo, error };
};

export const AccountAPI = {
    getAllUser,
    getUserByNFT,
    createAccount,
    updateUserNFT
}