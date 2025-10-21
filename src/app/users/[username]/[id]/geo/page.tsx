"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function GeoLocation() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName("");
    router.push(`geo/${name}`);
  };
  return (
    <div
      className="flex flex-col min-h-screen justify-center 
    items-center gap-10 bg-gray-300 text-black"
    >
      <h1 className=" text-2xl sm:text-5xl antialiased"> GeoLocation</h1>
      <div className="flex flex-col gap-5 items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <input
            type="text"
            placeholder="city, region"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex shrink-1 bg-gray-400 text-xl sm:text-3xl px-4 py-2 border-2 rounded-2xl
             border-gray-700 focus:bg-gray-800 focus:text-gray-100"
          />
          <button
            className="text-xl sm:text-3xl w-33
         bg-gray-400  border-2 rounded-2xl p-1 border-gray-700 active:bg-gray-800 active:text-gray-400"
          >
            🡅 send
          </button>
        </form>
      </div>
    </div>
  );
}
