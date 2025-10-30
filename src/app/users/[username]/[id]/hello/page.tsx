import HelloPage from "./component/HelloPage";

export default async function page() {
  const url = "http://localhost:3000/api/hello";
  return <HelloPage url={url} />;
}
