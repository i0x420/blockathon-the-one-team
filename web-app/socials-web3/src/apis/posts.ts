/**
 * 1. Get Post
 * 2. Create
 * 3. Update
 */

import { supabase } from "./clients";

export const getAllPosts = async () => {
  const { data: posts, error } = await supabase.from("posts").select("*");
  console.log("getAllPosts", { posts, error });

  return posts;
};