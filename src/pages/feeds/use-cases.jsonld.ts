import { SITE_URL } from '../../lib/seo/site';

export const prerender = true;

export function GET() {
  return Response.redirect(`${SITE_URL}/feeds/case-studies.jsonld`, 301);
}
