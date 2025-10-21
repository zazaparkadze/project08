import React from "react";
import getGeoResults from "@/lib/getGeoResults";
import GeoPage from "./components/GeoPage";
import BackButton from "@/ui/BackButton";
import type { Metadata } from "next";
import { BiCurrentLocation } from "react-icons/bi";

type Props = {
  params: {
    name: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${name} weather`,
    description: `${name} weather forecast`,
  };
}

export default async function page({ params }: Props) {
  const { name } = await params;
  const geoData = getGeoResults(name);
  const geoResultsRaw = await geoData;
  const geoResults: geoResults[] = geoResultsRaw.results;

  if (!geoResults) {
    return (
      <section className="grid place-content-center p-5 m-5">
        <h1 className="text-[16px] sm:text-3xl mb-5">
          Location with name:
          <br />
          <span className=" text-red-700">
            {" "}
            <BiCurrentLocation />
            {name}
          </span>
          <br />
          was not found
        </h1>
        <BackButton />
      </section>
    );
  }
  const content = (
    <div className="flex flex-col wrap-break-word bg-gray-300 text-black min-h-[100vh] justify-center items-center">
      <h1 className="text-[16px] sm:text-4xl text-center font-bold">
        {" "}
        {name.toUpperCase()}
      </h1>
      {geoResults.map((result) => (
        <GeoPage result={result} key={result.id} searchName={name} />
      ))}
    </div>
  );

  return content;
}
