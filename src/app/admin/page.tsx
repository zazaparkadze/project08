"use client";
import { useRef, useState, useEffect } from "react";

export default function Admin() {
  const [user, setUser] = useState("");
  const [roles, setRoles] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <form
        action=""
        className="grid place-content-center min-h-screen sm:text-2xl gap-4"
      >
        <input
          type="text"
          placeholder="user"
          value={user}
          ref={inputRef}
          onChange={(e) => setUser(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded"
        />
        <input
          type="text"
          placeholder="roles"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded"
        />
        <button className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded">
          update
        </button>
        <button className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded">
          delete
        </button>
      </form>
    </div>
  );
}
