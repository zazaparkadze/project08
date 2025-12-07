import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  username: string;
  id: number;
};

export default function UserHomePage({ username, id }: Props) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <p>Page for {username.toLocaleUpperCase()}</p>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={300}
          height={61}
          priority
        />
        <ul className="font-mono list-none sm:text-left text-xl">
          <li>
            <Link href={`${id}/geo`}>
              <p className="hover:scale-110 text-center">
                GeoLocation, weather forecast
              </p>
            </Link>
          </li>
          <br />
          <li>
            <Link href={`${id}/profiles`}>
              <p className="hover:scale-110 text-center">Profiles</p>
            </Link>
          </li>
          <br />
          <li>
            <Link href={`${id}/wikirocket`}>
              <p className="hover:scale-110 text-center">WikiRocket</p>
            </Link>
          </li>
          <br />
          <li>
            <Link href={`${id}/hello`}>
              <p className="hover:scale-110 text-center">hello</p>
            </Link>
          </li>
          <br />
        </ul>
      </main>
    </div>
  );
}
