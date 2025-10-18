"use client";
import clsx from "clsx";
import { useState } from "react";
import { format } from "date-fns";

export default function GeoLocation() {
  const [notEmpty, setNotEmpty] = useState(false);

  function getLocation() {
    function showPosition(position: GeolocationPosition) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !notEmpty
        ? (x.innerHTML =
            "Latitude: " +
            position.coords.latitude +
            "<br>Longitude: " +
            position.coords.longitude +
            "<br> Timestamp: " +
            format(new Date(position.timestamp), "yyyy-MM-dd\tHH:mm:ss"))
        : null;
      setNotEmpty(!notEmpty);
    }

    const x = document.getElementById("demo") as HTMLParagraphElement;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  return (
    <div>
      <div className="group">
        <button
          onClick={() => getLocation()}
          className="text-4xl text-center hover:text-amber-500"
        >
          Get Your Coordinates.
        </button>
        <span className="relative opacity-0 group-hover:opacity-100 left-1 bottom-6 text-xl bg-white text-black px-3 rounded-xl py-1 font-mono">
          click
        </span>
      </div>
      <p
        onClick={() => getLocation()}
        id="demo"
        className={clsx({
          "text-4xl text-blue-900  py-3 px-5 bg-gradient-to-l from-amber-600 to-amber-300 rounded-[20px]":
            notEmpty,
          hidden: !notEmpty,
        })}
      ></p>
    </div>
  );
}
