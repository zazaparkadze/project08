type Props = {
  username: string;
};
export default async function UserNavBar({ username }: Props) {
  const usersProfiles = [
    {
      name: "zaza",
      profile: {
        chat: "Discord",
        worksAt: "Hanson",
      },
    },
    {
      name: "tusya",
      profile: {
        chat: "WhatsApp",
        worksAt: "Atidim",
      },
    },
  ];

  const foundUserProfile = usersProfiles.find(
    (user) => user.name === username
  ) || {
    name: "Dear Guest",
    profile: {
      chat: "GridLine",
      worksAt: "Welcome to",
    },
  };

  const content = (
    <div className="sticky top-0 bg-gray-900 text-amber-500 h-15 flex justify-between items-center px-5 text-2xl">
      <div>Hello {username.toUpperCase()}</div>
      <div className="flex gap-3">
        <div>{foundUserProfile?.profile.worksAt}</div>
        <div>{foundUserProfile?.profile.chat}</div>
      </div>
    </div>
  );

  return content;
}
