import React from "react";
import MeteoPage from "../components/MeteoPage";
import getGeoResults from "@/lib/getGeoResults";
import objValuesToString from "@/lib/objValuesToString";
import type { Metadata } from "next";
import { LuHandshake } from "react-icons/lu";

type Props = {
  params: {
    name: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${name.replace(/^./, (char) => char.toUpperCase())} weather`,
    description: `${name} weather forecast`,
  };
}

export default async function Meteo({ params }: Props) {
  const { name } = await params;
  const geoData = getGeoResults(name);
  const geoResultsRaw = await geoData;

  const geoResults: geoResults[] = geoResultsRaw.results;

  const { latitude, longitude } = geoResults[0];

  const meteoParamObjectRaw: geoResults = { name, latitude, longitude };
  const meteoParamObject: SearchObject = objValuesToString(meteoParamObjectRaw);

  return (
    <div className={`text-3xl text-amber-500 flex flex-col items-center`}>
      <h1 className="flex flex-row gap-10 text-5xl pt-4">
        Hello I&apos;m Zaza <LuHandshake />
      </h1>
      <MeteoPage searchObject={meteoParamObject} />
    </div>
  );
}
