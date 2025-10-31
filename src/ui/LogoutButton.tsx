"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function LogoutButton() {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://project08-bay.vercel.app/api/logout"
      : "http://localhost:3000/api/logout";

  const handleLogout = async () => {
    await fetch(url, {
      method: "GET",
      credentials: "include",
    });
  };

  return (
    <Link href={"/"}>
      <div
        onClick={() => handleLogout()}
        className="flex gap-3 hover:bg-slate-400 hover:text-slate-900 text-3xl text-slate-400 max-w-fit border-1 px-5 py-2"
      >
        <FaHome className="border-red-100" />
        <p className="hidden sm:block ">Log Out</p>
      </div>
    </Link>
  );
}
