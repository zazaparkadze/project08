export default async function getAllEmployeesFetch() {
  const res = await fetch("https://nextapi-psi.vercel.app/api/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return "api server error";
  return res.json();
}
