import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('ref');

  if (!slug) {
    return NextResponse.json({ error: 'Ref is required' }, { status: 400 });
  }

  await revalidatePath(slug);

  return NextResponse.json({ revalidated: true });
}
