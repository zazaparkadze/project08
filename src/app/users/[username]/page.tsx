type Params = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Params) {
  const { username } = await params;
  return (
    <div>
      <p>UserPage</p>
      <p>Hello {username}</p>
    </div>
  );
}
