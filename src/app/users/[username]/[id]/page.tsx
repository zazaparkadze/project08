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
        <p className="sm:text-2xl text-[16px]">
          <Link href={"/register"}>
            {decodeURIComponent(username)}{" "}
            <span className="px-6 hover:text-amber-500 sm:text-2xl text-[16px]">
              click to register
            </span>
          </Link>
        </p>
      ) : username.includes("Allowed") ? (
        <p className="sm:text-2xl text-[16px]">
          {decodeURIComponent(username)}
        </p>
      ) : (
        <div className="sm:text-2xl text-[16px]">
          <UserHomePage username={username} id={id} />
        </div>
      )}
    </div>
  );

  return content;
}
