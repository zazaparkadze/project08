type Props = {
  username: string;
};
export default async function UserNavBar({ username }: Props) {
  const usersProfiles = [
    {
      name: "zaza",
      profile: {
        worksAt: "Hanson",
        chat: "Discord",
      },
    },
    {
      name: "tusya",
      profile: {
        worksAt: "Atidim",
        chat: "WhatsApp",
      },
    },
  ];

  const foundUserProfile = usersProfiles.find(
    (user) => user.name === username
  ) || {
    name: username,
    profile: {
      worksAt: "GridLine",
      chat: "Subscribe",
    },
  };

  const content = (
    <div className="sticky top-0 bg-gray-900 text-amber-500 sm:h-15 h-10 flex justify-between items-center px-5 text-[14px] sm:text-2xl">
      <div>Hello {foundUserProfile.name.toUpperCase()}</div>
      <div className="flex gap-3">
        <div>{foundUserProfile?.profile.worksAt}</div>
        <div>{foundUserProfile?.profile.chat}</div>
      </div>
    </div>
  );

  return content;
}
