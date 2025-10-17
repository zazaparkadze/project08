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

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await res.json();
    console.log(result);
    if (result.message === "Logged In") {
      router.push(`/users/${username}`);
    }
  }

  return (
    <div className="grid place-content-center gap-47 min-h-[100vh] text-3xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 p-10"
      >
        {/* <label htmlFor="username">Username</label> */}
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
        {/*         <label htmlFor="username">Password</label> */}
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
