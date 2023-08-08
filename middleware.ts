import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (req: NextRequest) => {
  const prevPage = req.nextUrl.pathname;

  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/auth/login?p=${prevPage}`, req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/checkout/:path*'],
};
