import React from "react";
import { format } from "date-fns";

type Props = {
  meteo: meteoResult;
};

export default function MeteoPageCurrent({ meteo }: Props) {
  return (
    <div className=" text-amber-500 p-6 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-400">
      <ul>
        <li>Refresh Interval: {meteo.current.interval / 60} minutes!</li>
        <li>
          Current Time: {format(meteo.current.time, "dd-MM-yyyy\tHH:mm:ss")}
        </li>
        <li>
          Current Temp: {meteo.current.temperature_2m}{" "}
          {meteo.current_units.temperature_2m}
        </li>
        <li>
          Current Wind Speed: {meteo.current.wind_speed_10m}{" "}
          {meteo.current_units.wind_speed_10m}
        </li>
      </ul>
    </div>
  );
}
