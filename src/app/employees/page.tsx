export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import getAllEmployees from "@/lib/getAllEmployees";
import EmployeePage from "./components/EmployeePage";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "employees",
  description: "from mongoDB",
};

export default async function page() {
  const data = JSON.parse(await getAllEmployees());
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="text-4xl text-center py-5 ">
        <Link href={"employees/manageEmployees"}>Add or Delete Employee</Link>
      </div>
      <EmployeePage data={data} />
    </>
  );
}
