"use client";
import { useRef, useState, useEffect } from "react";

export default function Admin() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("");
  const [updatedUser, setUpdatedUser] = useState({
    message: "Awaiting update",
    foundUser: {
      roles: {
        user: 2001,
      },
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const url =
    process.env.NODE_ENV === "production"
      ? "https://project08-bay.vercel.app/api/admin"
      : "http://localhost:3000/api/admin";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleDelete = () => {
    const handleFetch = async () => {
      await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ user }),
      });
    };
    handleFetch();
    setUser("");
  };

  const handleUpdate = () => {
    console.log("updated");
    const handleFetch = async () => {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, role, pwd }),
      });
      const data = await res.json();
      console.log(data);
      setUpdatedUser(data);
    };
    handleFetch();
    setRole("");
    setUser("");
    setPwd("");
  };

  const handleUpdateRole = () => {
    console.log("Role Deleted");
    const handleFetch = async () => {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, role }),
      });
      const data = await res.json();
      console.log(data);
      setUpdatedUser(data);
    };
    handleFetch();
    setRole("");
    setUser("");
    setPwd("");
  };

  return (
    <div className="grid place-content-center min-h-screen gap-8 ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid place-content-center sm:text-2xl gap-4"
      >
        <input
          type="text"
          placeholder="user"
          required
          value={user}
          ref={inputRef}
          onChange={(e) => setUser(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded  hover:bg-white hover:text-black"
        />
        <input
          type="text"
          placeholder="pwd"
          value={pwd}
          ref={inputRef}
          onChange={(e) => setPwd(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded hover:bg-white hover:text-black"
        />
        <input
          type="text"
          placeholder="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded  hover:bg-white hover:text-black"
        />
        <button
          onClick={handleUpdate}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded  hover:bg-white hover:text-black"
        >
          update password / add role
        </button>
        <button
          onClick={handleUpdateRole}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded  hover:bg-white hover:text-black"
        >
          delete role
        </button>
        <button
          onClick={handleDelete}
          className="sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded  hover:bg-white hover:text-black"
        >
          delete user
        </button>
      </form>
      <section
        className="text-2xl text-black
      "
      >
        <p>Message: {updatedUser.message}</p>
        <p>User roles: {JSON.stringify(updatedUser.foundUser?.roles)}</p>
      </section>
    </div>
  );
}
