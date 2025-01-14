import { NextResponse } from 'next/server';
import { posts } from '@/lib/post';

export async function GET() {
  return NextResponse.json(posts);
}