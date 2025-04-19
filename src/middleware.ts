// import { NextRequest , NextResponse } from 'next/server'
// export { default } from "next-auth/middleware"
// import { getToken } from "next-auth/jwt"


// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({req:request})
//     const url = request.nextUrl
//     if(token &&
//         (
//             url.pathname.startsWith('/sign-in') ||
//             url.pathname.startsWith('/sign-up') ||
//             url.pathname.startsWith('/verify') ||
//             url.pathname.startsWith('/')
//         ))
//         {
//             return NextResponse.redirect(new URL('/dashboard', request.url))   
//     }
//     if(!token && url.pathname.startsWith('/dashboard')){
//         return NextResponse.redirect(new URL('/sign-in', request.url))
//     }
//     return NextResponse.next()
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/sign-in',
//     '/sign-up',
//     '/',
//     '/dashboard/:path*',
//     '/verify/:path*'
// ],
// }
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl

  // 🔒 If user is authenticated and tries to visit public pages, redirect to dashboard
  if (
    token &&
    (
      url.pathname === '/' || 
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify')
    )
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 🔐 If user is NOT authenticated and tries to visit dashboard, redirect to sign-in
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*',
  ],
}
