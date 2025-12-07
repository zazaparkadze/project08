import { columns } from "./columns";
import { DataTable } from "@/app/mongousers/data-table";
import getAllEmployees from "@/lib/getAllEmployees";
export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const data: Employee[] = JSON.parse(await getAllEmployees());

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
