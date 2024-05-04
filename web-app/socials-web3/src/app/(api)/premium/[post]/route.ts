import { PostsAPI } from "@/services/apis";
import { NextResponse } from "next/server";

type Params = {
  post: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const post = context.params.post; // uuid of post

  const res = await PostsAPI.markPremiumPost(post);

  return NextResponse.json(res, { status: 200 });
}
