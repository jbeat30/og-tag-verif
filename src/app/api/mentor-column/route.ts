import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://s3.ap-south-1.amazonaws.com/static.wematchnow.com/common/test/mockup/post.json')

    if (!response.ok) {
      return NextResponse.json({message: 'error', error: 'response not ok'});
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({message: 'error', error: e});
  }
}