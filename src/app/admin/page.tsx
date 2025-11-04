"use client";
import { useRef, useState, useEffect } from "react";

export default function Admin() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [roles, setRoles] = useState("");
  const [status, setStatus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleDelete = () => {
    const handleFetch = async () => {
      const response = await fetch("http://localhost:3000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      if (response.status === 200) setStatus(true);
    };
    handleFetch();
    setUser("");
  };

  const handleUpdate = () => {
    console.log("updated");
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
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
          placeholder="pwd"
          value={pwd}
          ref={inputRef}
          onChange={(e) => setPwd(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded"
        />
        <input
          type="text"
          placeholder="roles"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded"
        />
        <button
          onClick={handleUpdate}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded"
        >
          update
        </button>
        <button
          onClick={handleDelete}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded"
        >
          delete
        </button>
      </form>
      {!status ? <p></p> : <p>deleted</p>}
    </div>
  );
}
