/**
 * 1. Get Post
 * 2. Create
 * 3. Update
 */

import { supabase } from "./clients";

const getAllPosts = async () => {
  const { data: posts, error } = await supabase.from("posts").select("*");
  console.log("getAllPosts", { posts, error });

  return { posts, error };
};
const getPostById = async (id: string) => {
  const { data: community, error } = await supabase
    .from("posts")
    .select("*")
    .eq("uuid", id);
  console.log("getPostById", { community, error });

  return { community, error };
};
const createPost = async (title: string, author: string, content: string) => {
  const { data: post, error } = await supabase
    .from("posts")
    .insert([{ author, title, content }]);
  console.log("createPost", { post, error });

  return { post, error };
};
const updatePost = async (id: string, body: any) => {
  const { data: post, error } = await supabase
    .from("posts")
    .update(body)
    .eq("uuid", id)
    .select();
  console.log("updatePost", { post, error });

  return { post, error };
};

export const PostsAPI = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
};
