import React from "react";
import getSunResults from "@/lib/getSunResults";
import BackButton from "@/ui/BackButton";
import HomeButton from "@/ui/HomeButton";

export default async function SunPage({ name }: { name: string }) {
  const sunResults: SunsetSunrizeResult = await getSunResults(name);
  const result = sunResults.results;
  const content = (
    <div className="flex flex-col w-fit gap-y-2">
      <div className="flex flex-col h-[160px] text-[16px] sm:text-3xl items-center justify-between text-nowrap bg-slate-600 text-amber-300 py-4 rounded-[15px] grow-1 ">
        <div> In {name.replace(/^./, (char) => char.toUpperCase())}</div>
        <div className="flex flex-row gap-x-6 ">
          <HomeButton />
          <BackButton />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <p className="text-[16px] sm:text-3xl bg-slate-800 text-amber-400 py-5 px-15 rounded-[15px] grow-1">
          Sunrise: {result.sunrise}
        </p>
        <p className="text-[16px] sm:text-3xl bg-slate-800 text-amber-400 py-5 px-15 rounded-[15px] grow-1">
          SunSet: {result.sunset}
        </p>
      </div>
      <div className=" text-black p-6 text-[16px] sm:text-3xl rounded-2xl bg-gradient-to-r from-gray-600 to-gray-200">
        <p>Day Length: {result.day_length}</p>
        <p>Time Zone: {result.timezone}</p>
        <p className="font-extrabold">Status: {sunResults.status}</p>
      </div>
    </div>
  );
  return content;
}
