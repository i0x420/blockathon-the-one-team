/**
 * 1. Get Community
 * 2. Create
 * 3. Update
 */

import slugify from "slugify";
import { supabase } from "./clients";

export const getAllCommunity = async () => {
  const { data: community, error } = await supabase
    .from("community")
    .select("*");
  console.log("getAllCommunity", { community, error });

  return community;
};
export const getCommunityBySlug = async (slug: string) => {
  const { data: community, error } = await supabase
    .from("community")
    .select("*")
    .eq("slug", slug);
  console.log("getCommunityBySlug", { community, error });

  return community;
};
export const createCommunity = async (name: string, description: string) => {
  const { data: community, error } = await supabase
    .from("community")
    .insert([
      { name, description, slug: slugify(name), meta: { owner: "dungnguyen" } },
    ]);
  console.log("createCommunity", { community, error });

  return community;
};
export const updateCommunity = async (slug: string, body: any) => {
  const { data: community, error } = await supabase
    .from("community")
    .update(body)
    .eq("slug", slug)
    .select();
  console.log("updateCommunity", { community, error });

  return community;
};
