import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: AsyncColumn }) {
  const { id } = await params

  const response = await fetch('https://s3.ap-south-1.amazonaws.com/static.wematchnow.com/common/test/mockup/post.json')

  if (!response.ok) {
    return NextResponse.json({message: 'error', error: 'response not ok'});
  }

  const data = await response.json();
  // 목업에서 id 맞는거 찾아서 반환
  const obj = data.find((post: PostData) => {
    return post.id == id
  })

  if (!obj) {
    return NextResponse.json({message: 'Not Found'}, {status: 404})
  }

  return NextResponse.json(obj)
}