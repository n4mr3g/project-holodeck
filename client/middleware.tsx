import { authMiddleware } from '@clerk/nextjs/server';
export default authMiddleware({
  // debug: true,
  publicRoutes: ['/', '/about', '/test'],
  // beforeAuth: () => false,
  // ignoredRoutes: ['/'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
