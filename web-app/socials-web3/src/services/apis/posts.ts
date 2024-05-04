/**
 * 1. Get Post
 * 2. Create
 * 3. Update
 */

import { merge } from "lodash";
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

const markPremiumPost = async (uuid: string) => {
  const { data: post, error } = await supabase
    .from("posts")
    .update({ premium: true })
    .eq("uuid", uuid)
    .select();
  console.log("markPremiumPost", { post, error });

  return { post, error };
};

interface FetchNewFeedParams {
  username: string;
  community: string[];
}

const fetchNewFeed = async ({ username, community }: FetchNewFeedParams) => {
  const { data: posts, error } = await supabase.from("posts").select("*");

  const communityPost = [];
  const premiumPost = [];
  const freedomPost = [];

  return { posts: merge(communityPost, premiumPost, freedomPost), error };
};

export const PostsAPI = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  markPremiumPost
};
