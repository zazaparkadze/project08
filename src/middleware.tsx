export function middleware(request: Request) {
  console.log("Middleware");
  console.log(request.method);
  console.log(request.url);
}
export const config = {
  matcher: ["/api/(.*)"],
};
