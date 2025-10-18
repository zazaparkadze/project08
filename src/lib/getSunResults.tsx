import getGeoResults from "./getGeoResults";
import { URLSearchParams } from "url";

export default async function getSunResults(name: string) {
  const geoData = getGeoResults(name);
  const geoResultsRaw = await geoData;
  const geoResults: geoResults[] = geoResultsRaw.results;

  const searchParams = new URLSearchParams({
    lat: geoResults[0].latitude.toString(),
    lng: geoResults[0].longitude.toString(),
  });

  const sunResultsRaw = await fetch(
    "https://api.sunrisesunset.io/json?" + searchParams
  );
  return sunResultsRaw.json();
}
