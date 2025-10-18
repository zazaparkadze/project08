import React from "react";
import getMeteoResults from "@/lib/getMeteoResults";
import SunPage from "./SunPage";
import MeteoPageCurrent from "./MeteoPageCurrent";
import MeteoPageHourly from "./MeteoPageHourly";

type Props = {
  searchObject: SearchObject;
};

export default async function MeteoPage({ searchObject }: Props) {
  const meteoData: Promise<meteoResult> = getMeteoResults(searchObject);
  const meteo = await meteoData;

  const timeTemperatureWindHumidityArray: (string | number)[][] = [];
  meteo.hourly.time.forEach((element) =>
    timeTemperatureWindHumidityArray.push([
      element,
      meteo.hourly.temperature_2m[meteo.hourly.time.indexOf(element)],
      meteo.hourly.wind_speed_10m[meteo.hourly.time.indexOf(element)],
      meteo.hourly.relative_humidity_2m[meteo.hourly.time.indexOf(element)],
    ])
  );

  const content = (
    <div className="text-black m-5">
      <SunPage name={searchObject.name} />
      <br />
      <MeteoPageCurrent meteo={meteo} />
      {timeTemperatureWindHumidityArray.map(
        ([time, temp, wind_speed, humidity]) => {
          return (
            <MeteoPageHourly
              key={time}
              time={time}
              temp={temp}
              wind_speed={wind_speed}
              humidity={humidity}
              tempUnit={meteo.hourly_units.temperature_2m}
              wind_speedUnit={meteo.hourly_units.wind_speed_10m}
              humidityUnit={meteo.hourly_units.relative_humidity_2m}
            />
          );
        }
      )}
    </div>
  );
  return content;
}
