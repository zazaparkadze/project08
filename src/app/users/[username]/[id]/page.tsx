import UserHomePage from "./component/UserHomePage";
import Link from "next/link";
type Params = {
  params: {
    username: string;
    id: number;
  };
};

export default async function UserPage({ params }: Params) {
  const { username, id } = await params;
  const content = (
    <div>
      {username.includes("Register") ? (
        <>
          <p className="sm:text-2xl text-[16px]">
            {decodeURIComponent(username)}{" "}
          </p>
          <p>
            <Link href={"/register"}>
              <span className="pt-5 hover:text-amber-500 sm:text-2xl text-[16px]">
                click to register
              </span>
            </Link>
          </p>
        </>
      ) : username.includes("Allowed") ? (
        <>
          <p className="sm:text-2xl text-[16px]">
            {decodeURIComponent(username)}
          </p>
          <p className="hover:text-amber-600 mt-4 text-xl">
            <Link href={"/login"}>Click to Sign In</Link>
          </p>
        </>
      ) : (
        <div className="sm:text-2xl text-[16px]">
          <UserHomePage username={username} id={id} />
        </div>
      )}
    </div>
  );

  return content;
}
