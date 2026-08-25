import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.rewrite(
    new URL(`/Services${request.nextUrl.pathname.slice('/services'.length)}`, request.url)
  )
}

export const config = {
  matcher: '/services/:path*',
}