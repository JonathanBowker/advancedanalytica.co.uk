import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient, isSupabaseConfigured } from './lib/supabaseServer';

const protectedPaths = ['/portal'];
const authPages = ['/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = new URL(context.request.url);

  if (pathname === '/index.html') {
    const redirectTarget = search ? `/${search}` : '/';
    return context.redirect(redirectTarget, 301);
  }

  if (!isSupabaseConfigured) {
    context.locals.user = null;
    return next();
  }

  const supabase = createSupabaseServerClient({
    request: context.request,
    cookies: context.cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  context.locals.user = user ?? null;

  if (protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    if (!user) {
      const nextPath = pathname === '/portal' && !search ? pathname : `${pathname}${search}`;
      return context.redirect(`/login?next=${encodeURIComponent(nextPath)}`);
    }
  }

  if (authPages.includes(pathname) && user) {
    return context.redirect('/portal');
  }

  return next();
});
