/* import getAllEmployeesFetch from "@/lib/getAllEmployeesFetch"; */
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "employees",
  description: "employees fetched from mongoDB",
};

import getAllEmployees from "@/lib/getAllEmployees";
import EmployeePage from "./components/EmployeePage";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

/*  export default function page() {
  const data: Promise<Employee[]> = getAllEmployeesFetch(); */
export default async function page() {
  const data = JSON.parse(await getAllEmployees());
  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="text-4xl text-center py-5 ">
        <Link href={"employees/manageEmployees"}>Add or Delete Employee</Link>
      </div>
      <EmployeePage data={data} />
    </Suspense>
  );
}
