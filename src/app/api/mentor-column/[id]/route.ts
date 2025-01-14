import {NextRequest, NextResponse} from "next/server";
import {posts} from "@/lib/post";

export async function GET(request: NextRequest, {params}: { params: AsyncColumn }) {
  const { id } = await params

  // 목업에서 id 맞는거 찾아서 반환
  const obj = posts.find((post) => {
    return post.id == id
  })
  if (!obj) {
    return NextResponse.json({message: 'Not Found'}, {status: 404})
  }

  return NextResponse.json(obj)
}