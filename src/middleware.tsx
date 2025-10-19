export function middleware(request: Request) {
  console.log(request.headers.get("origin"));
}
export const config = {
  matcher: ["/api/(.*)"],
};
