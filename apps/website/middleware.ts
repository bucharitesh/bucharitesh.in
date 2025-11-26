import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next|_vercel|api|[\\w-]+\\.\\w+).*)'],
};

export default async function middleware() {
  return NextResponse.next();
}
