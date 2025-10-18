import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href={"/"}>
      <div className="flex gap-3 hover:bg-slate-400 hover:text-slate-900 text-4xl text-slate-400 max-w-fit border-1 px-5 py-2">
        <FaHome className="border-red-100" />
        <p className="hidden sm:block ">Home</p>
      </div>
    </Link>
  );
}
