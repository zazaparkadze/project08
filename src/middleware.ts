import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  console.log(origin);
  // check logged in user's roles

  //I verify jwt refreshToken

  //if it is valid, I find user with this refreshToken ... since user must be logged in

  // if roles include root, the user has access to /api/secret, othewise rejected
}

export const config = {
  matcher: ["/api/secret"],
};
