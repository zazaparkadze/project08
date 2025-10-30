"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      credentials: "include",
    });
  };

  return (
    <Link href={"/"}>
      <div
        onClick={() => handleLogout()}
        className="flex gap-3 hover:bg-slate-400 hover:text-slate-900 text-4xl text-slate-400 max-w-fit border-1 px-5 py-2"
      >
        <FaHome className="border-red-100" />
        <p className="hidden sm:block ">Log Out</p>
      </div>
    </Link>
  );
}
