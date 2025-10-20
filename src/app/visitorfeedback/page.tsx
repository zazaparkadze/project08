"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textContent, setTextContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedbackObj: Feedback = {
      name,
      email,
      phone,
      textContent,
    };

    /* const res = await fetch("https://project08-bay.vercel.app/api/feedback", { */
    const res = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackObj),
    });

    if (!res.ok) {
      router.push(
        `thankyou/name=Server&email=Error&phone=1-800-help&textContent=try+again+later`
      );
    }
    const result = await res.json();
    console.log(result);
    const paramsString = new URLSearchParams(result).toString();

    router.push(`thankyou/${paramsString}`);

    setName("");
    setEmail("");
    setPhone("");
    setTextContent("");
  };

  const formContent = (
    <div className="grid place-items-center min-h-screen text-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-7 px-5"
      >
        <label htmlFor="name">*Name</label>
        <input
          type="text"
          name="name"
          aria-label="name"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-white border-[1px] px-5 py-2 brightness-40"
        />
        <label htmlFor="email">*Email</label>
        <input
          type="text"
          name="email"
          aria-label="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-white border-1 px-5 py-2 brightness-40"
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          aria-label="phone"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-white border-1 px-5 py-2 brightness-40"
        />
        <label htmlFor="feedback">Feedback</label>
        <textarea
          name="feedback"
          rows={8}
          cols={40}
          value={textContent}
          aria-label="FeedBack"
          placeholder="type here"
          onChange={(e) => setTextContent(e.target.value)}
          className="border-white border-[0.5px] px-5 py-2 brightness-40"
        />
        <button className="border-white border-1 px-5 py-2 brightness-40 hover:brightness-110">
          submit
        </button>
      </form>
    </div>
  );
  return formContent;
}
