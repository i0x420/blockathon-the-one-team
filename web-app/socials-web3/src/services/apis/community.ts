/**
 * 1. Get Community
 * 2. Create
 * 3. Update
 */

import slugify from "slugify";
import { supabase } from "./clients";

const getAllCommunity = async () => {
  const { data: community, error } = await supabase
    .from("community")
    .select("*");
  console.log("getAllCommunity", { community, error });

  return { community, error };
};
const getCommunityBySlug = async (slug: string) => {
  const { data: community, error } = await supabase
    .from("community")
    .select("*")
    .eq("slug", slug);
  console.log("getCommunityBySlug", { community, error });

  return { community, error };
};
const createCommunity = async (
  name: string,
  description: string,
  hash: string,
  salt: string,
  contractAddress: string,
  owner: string
) => {
  const { data: community, error } = await supabase.from("community").insert([
    {
      name,
      description,
      slug: slugify(name),
      meta: { owner, hash, salt, contractAddress }
    }
  ]);
  console.log("createCommunity", { community, error });

  return { community, error };
};
const updateCommunity = async (slug: string, body: any) => {
  const { data: community, error } = await supabase
    .from("community")
    .update(body)
    .eq("slug", slug)
    .select();
  console.log("updateCommunity", { community, error });

  return { community, error };
};

export const CommunityAPI = {
  createCommunity,
  getAllCommunity,
  getCommunityBySlug,
  updateCommunity
};
