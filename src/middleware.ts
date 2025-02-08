import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('fetch-access-token');
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FzIiwiZW1haWwiOiJzYXNAc2Euc3MiLCJpYXQiOjE3MzkwMTk0NDYsImV4cCI6MTczOTAyMzA0Nn0.VoDZvK30TpBKfNg99uyusfnAq15NUc80LDA8fPux7G8';

  // Log the cookie to check if it's available
  console.log('Token: ', token);

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/search/:path*', '/search', '/favorites', '/'],
};
