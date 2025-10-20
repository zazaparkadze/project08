import UserHomePage from "./component/UserHomePage";
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
        <p className="text-2xl">{decodeURIComponent(username)}</p>
      ) : username.includes("Allowed") ? (
        <p className="text-3xl">{decodeURIComponent(username)}</p>
      ) : (
        <div className="text-2xl">
          {/* <p> Hello ... {decodeURIComponent(username).toUpperCase()}</p> */}
          <UserHomePage username={username} id={id} />
        </div>
      )}
    </div>
  );

  return content;
}
