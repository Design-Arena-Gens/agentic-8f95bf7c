import { NextRequest, NextResponse } from 'next/server';
import { videos } from '@/lib/videoStore';

export async function GET(request: NextRequest) {
  return NextResponse.json({ videos });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
  }

  const index = videos.findIndex(v => v.id === id);
  if (index > -1) {
    videos.splice(index, 1);
  }

  return NextResponse.json({ success: true });
}
