"use client";
import React from "react";
import { createMongoPost } from "@/app/action";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateMongoPost() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <div className="flex flex-col text-xl justify-center items-center">
      <form
        ref={ref}
        action={async (formData) => {
          await createMongoPost(formData);
          ref.current?.reset();
          router.refresh();
        }}
        className="flex flex-col items-center gap-2 "
      >
        <label htmlFor="title"> Title</label>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="border-1 px-3 py-1"
        />
        <label htmlFor="newpost"> New Post</label>
        <textarea
          name="newpost"
          placeholder="new post"
          className="border-1 px-3 py-1"
        />
        <button className="bg-gray-800 px-4 py-1 rounded">submit</button>
      </form>
    </div>
  );
}
