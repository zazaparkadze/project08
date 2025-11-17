"use client";
import { useEffect, useState } from "react";
import LogoutButton from "@/ui/LogoutButton";
import HomeButton from "@/ui/HomeButton";
import ReducerComponent from "./ReducerComponent";

type Result = {
  [index: string]: string;
  message: string;
};

export default function HelloPage({ url }: { url: string }) {
  const [result, setResult] = useState<Result>({ message: "loading..." });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setResult({
            message:
              res.statusText === "no tokens present"
                ? "No Tokens: NOT authorized, Sign in again"
                : "Access token not valid or expired ",
          });
          return;
        }
        const data: Result = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setResult({ message: "error fetching" });
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="flex flex-col min-h-screen">
      <p className="text-3xl pb-3"> {result.message}</p>
      <LogoutButton />
      <HomeButton />
      <ReducerComponent />
    </div>
  );
}
