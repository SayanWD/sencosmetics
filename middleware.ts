import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const locales = ['kz', 'ru']
const defaultLocale = 'ru'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const isLocalePrefixed = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (!isLocalePrefixed) {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
}


