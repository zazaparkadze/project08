import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const allowedOrigind =
  process.env.NODE_ENV === "production"
    ? [
        "*vercel.app",
        "http://localhost:3000",
        "https://www.parkadze.com",
        "https://www.google.com",
        "https://project08-bay.vercel.app",
        "https://nextapi-psi.vercel.app",
      ]
    : [
        "http://localhost:3000",
        "https://www.parkadze.com",
        "https://www.google.com",
        "https://vercel.com",
        "https://project08-bay.vercel.app",
        "https://nextapi-psi.vercel.app",
      ];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const { pathname } = request.nextUrl;
  if (origin && !allowedOrigind.includes(origin)) {
    return new NextResponse(
      JSON.stringify({ message: "Bad Request/Not Allowed" }),
      {
        status: 400,
        statusText: "Bad request legamre",
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
  ////////////////////
  if (pathname === "/michael") {
    return NextResponse.redirect(new URL("https://parkadze.com"));
  }
  ///////////////////

  if (pathname === "/api/login" || pathname === "/api/register") {
    return; // ⛔ Do nothing → middleware skipped
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/michael"],
};

/*


  if (pathname === "/api/hello") {
    const accessToken = cookieStore.get("accessToken")?.value as string;
    const refreshToken = cookieStore.get("refreshToken")?.value as string;

    if (!accessToken && !refreshToken) {
      console.log("no refresh token:", refreshToken);
      console.log("request.url:", request.url);
      console.log("next.url:", request.nextUrl);
      const newUrl = new URL("/api/login", request.url);
      console.log(newUrl);
      return NextResponse.redirect(newUrl);
    }

    if (accessToken && refreshToken) {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
        (err, decoded) => {
          if (err) {
            return NextResponse.redirect(
              new URL("http://localhost:3000/login")
            );
          }
          console.log(decoded as MyJwtPayload, "first, accessToken Check");
        }
      );
      NextResponse.next();
    }
    if (!accessToken && refreshToken) {
      //verify refreshtoken
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );
      console.log("decoded: ", decoded);
      if (!(decoded as MyJwtPayload).username) {
        console.log(decoded, "from refreshtoken check");
        return NextResponse.redirect(
          new URL("http://localhost:3000/api/login")
        );
      }
      //✅ The middleware checks cookies.
      //✅ If the access token is missing, it calls your refresh endpoint.
      //✅ The endpoint sets a new accessToken cookie, and the middleware forwards it.
    }
    //verify ended
    const refreshEndpoint = "http://localhost:3000/api/refresh";
    const res = await fetch(refreshEndpoint, {
      method: "GET",
      headers: { cookie: `refreshToken=${refreshToken}` },
    });
    if (res.ok) {
      console.log("accessToken cookie set");
      const next = NextResponse.next();
      console.log(res.headers);
      const setCookieHeader = res.headers.get("set-cookie");
      console.log(setCookieHeader);
      if (setCookieHeader) next.headers.set("set-cookie", setCookieHeader);
    }
    return NextResponse.next();
  }




*/
