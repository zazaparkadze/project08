"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Watch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const content = (
    <div
      suppressHydrationWarning
      className=" w-fit px-5 py-2 mt-3 ml-3 text-white text-xl 
      rounded-3xl bg-gradient-to-r from-black/100 to-gray-700"
    >
      {format(time, "yyyy-MM-dd hh:mm:ss")}
    </div>
  );
  return content;
}
