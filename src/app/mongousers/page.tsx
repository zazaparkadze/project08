import { columns } from "./columns"; //Payment
import { DataTable } from "@/app/mongousers/data-table";
import getAllEmployees from "@/lib/getAllEmployees";
/* 
async function getData(): Promise<Employee[]> {
  const data = JSON.parse(await getAllEmployees());
  return data;
} */

export default async function DemoPage() {
  const data: Employee[] = JSON.parse(await getAllEmployees()); //await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
