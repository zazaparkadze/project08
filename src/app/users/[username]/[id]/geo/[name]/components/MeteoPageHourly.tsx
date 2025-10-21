import React from "react";
import clsx from "clsx";
import { format } from "date-fns";

type Props = {
  time: string | number;
  temp: number | string;
  wind_speed: number | string;
  humidity: number | string;
  tempUnit: string;
  humidityUnit: string;
  wind_speedUnit: string;
};

export default function MeteoPageHourly({
  time,
  temp,
  wind_speed,
  humidity,
  tempUnit,
  wind_speedUnit,
  humidityUnit,
}: Props) {
  const dateTime = new Date(time).toString();
  return (
    <section className="w-[100%] bg-gradient-to-r from-gray-400 to-gray-100 flex flex-col items-center justify-center gap-1 mt-3 py-2 rounded-[15px]">
      <p className="font-bold text-[16px] sm:text-3xl">
        {format(dateTime, "dd-MM-yyyy\thh:mm:ss")}:{" "}
        <span
          className={`${clsx({
            "text-red-900": Number(temp) >= 33,
            "text-blue-600": Number(temp) > 10 && Number(temp) < 33,
            "text-blue-400": Number(temp) > 1 && Number(temp) <= 10,
            "text-blue-900": Number(temp) <= 0,
          })} underline`}
        >
          {" "}
          {temp} {tempUnit}
        </span>
      </p>
      <p className="font-bold text-[16px] sm:text-3xl">
        Wind: {wind_speed} {wind_speedUnit}
      </p>
      <p className="font-bold text-[16px] sm:text-3xl">
        Humidity: {humidity} {humidityUnit}{" "}
      </p>
    </section>
  );
}
