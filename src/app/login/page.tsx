"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /*  const res = await fetch("https://project08-bay.vercel.app/api/login", { */
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await res.json();

    if (result.username === username) {
      router.push(`/users/${username}/${result.id}`);
      document.cookie = `accessToken=${result.accessToken}; Max-Age=120; SameSite=lax; path=/`;
      setUsername("");
      setPassword("");
    } else {
      router.push(`/users/${result.username}/0`);
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className="grid place-content-center gap-47 min-h-[100vh] text-3xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 p-10"
      >
        <input
          name="username"
          type="text"
          ref={inputRef}
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="px-6 py-2 border-1 rounded-2xl"
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-6 py-2 border-1 rounded-2xl"
        />
        <button type="submit" className="px-6 py-2 border-1 rounded-2xl">
          Sign In
        </button>
      </form>
    </div>
  );
}
//
