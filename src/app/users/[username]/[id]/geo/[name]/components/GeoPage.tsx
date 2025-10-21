import Link from "next/link";

type Props = {
  result: geoResults;
  searchName: string;
};

export default function GeoPage({ result, searchName }: Props) {
  const { id, name, latitude, longitude, timezone } = result;
  return (
    <div>
      <ol className="text-[16px] sm:text-2xl text-center flex flex-col">
        <li>id: {id}</li>
        <li>Name: {name}</li>
        <li>Longitude: {longitude}</li>
        <li>Latitude: {latitude}</li>
        <li>Timezone: {timezone}</li>
      </ol>
      <p className="text-[16px] sm:text-4xl text-center font-extrabold underline">
        <Link href={`${searchName}/meteo`}> Get Weather Info</Link>
      </p>
    </div>
  );
}
