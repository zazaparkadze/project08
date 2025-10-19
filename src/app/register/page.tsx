"use client";
import Link from "next/link";
import { useState, FormEvent, useRef, useEffect } from "react";
/* import { useRouter } from "next/navigation"; */
import clsx from "clsx";

export default function UserRegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerResult, setRegisterResult] = useState(true);
  const [registration, setRegistration] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  /*   const router = useRouter(); */

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(" https://project08-bay.vercel.app/api/register", {
      /* const res = await fetch("http://localhost:3000/api/register", { */
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
      /*    router.push(`/users/${username}`); */
      setRegistration(false);
      setPassword("");
      setUsername("");
    }
    if (result.message === "choose another username") {
      setRegisterResult(false);
      setPassword("");
      setUsername("");
    }
    if (result.message === "registration failed") {
      setPassword("");
      setUsername("");
      alert("server error");
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
          Register
        </button>
      </form>

      <p className={clsx("text-white", { hidden: registerResult })}>
        {" "}
        Choose another username, Please
      </p>
      <p className={clsx("text-white", { hidden: registration })}>
        {" "}
        <Link href={"/login"}> Success, click here to Sign In</Link>
      </p>
    </div>
  );
}
