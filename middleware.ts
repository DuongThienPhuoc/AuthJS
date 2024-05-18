import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT, DEFAULT_SUCCESS_LOGIN_REDIRECT,
    publicRoutes
} from '@/route'
import {NextResponse} from "next/server";

export const {auth} = NextAuth(authConfig)

export default auth(req => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth
    const isApiAuth = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicAuth = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    if (isApiAuth) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            const url = req.url.replace(req.nextUrl.pathname, DEFAULT_SUCCESS_LOGIN_REDIRECT)
            return Response.redirect(url)
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicAuth) {
        const url = req.url.replace(req.nextUrl.pathname, DEFAULT_LOGIN_REDIRECT)
        return Response.redirect(url)
    }

    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};


