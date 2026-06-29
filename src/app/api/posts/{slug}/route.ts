import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/posts/{slug}',
    timestamp: new Date().toISOString(),
  });
}
