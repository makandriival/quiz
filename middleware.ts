import { NextRequest, NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') return NextResponse.redirect(new URL('/en/quiz/1', request.url))

  return NextResponse.next()
}

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/(de|en|es|fr)/:path*',
    '/((?!_next).*)',
    '/'
  ],
}

 
