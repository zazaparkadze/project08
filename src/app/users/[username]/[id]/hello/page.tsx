import HelloPage from "./component/HelloPage";

export default async function page() {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://project08-bay.vercel.app/api/hello"
      : "http://localhost:3000/api/hello";

  return <HelloPage url={url} />;
}
