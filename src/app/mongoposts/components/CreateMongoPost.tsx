"use client";
import React from "react";
import { createMongoPost } from "@/app/action";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateMongoPost() {
  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="flex flex-col text-xl justify-center items-center">
      <form
        ref={ref}
        action={async (formData) => {
          await createMongoPost(formData);
          ref.current?.reset();
          router.refresh();
        }}
        className="flex flex-col items-center gap-2 rounded-xl"
      >
        <label htmlFor="title"> Title</label>
        <input
          type="text"
          name="title"
          ref={inputRef}
          placeholder="title"
          className="border-1 px-3 py-1 rounded-xl"
        />
        <label htmlFor="newpost"> New Post</label>
        <textarea
          name="newpost"
          placeholder="new post"
          className="border-1 px-3 py-1 rounded-xl"
        />
        <button className="bg-gray-800 px-4 py-1 rounded-xl hover:scale-105">
          submit
        </button>
      </form>
    </div>
  );
}
