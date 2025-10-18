"use client";
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-3 opacity-75 hover:opacity-100 hover:bg-amber-400 hover:cursor-pointer text-4xl text-gray-800 max-w-fit border-1 px-5 py-2"
    >
      <FaBackward />
      <p className="hidden sm:block ">Back</p>
    </button>
  );
}
