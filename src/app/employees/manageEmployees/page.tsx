"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import getAllEmployees from "@/lib/getAllEmployees";
import createEmployee from "@/lib/createEmployee";
import deleteEmployee from "@/lib/deleteEmployee";

export default function EmployeeForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const allEmployees: Employee[] = JSON.parse(await getAllEmployees());
    const newEmployee: Employee = JSON.parse(
      await createEmployee({
        id: allEmployees.length
          ? allEmployees[allEmployees.length - 1].id + 1
          : 1,
        firstname,
        lastname,
      })
    );
    if (newEmployee.firstname === firstname) {
      const status = "created";
      router.push(`/feedback/${status}`);
      setFirstname("");
      setLastname("");
    }
  }
  async function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await deleteEmployee(Number(id));
    console.log(response);
    if (JSON.parse(response).deletedCount === 0) {
      const status = "notFound";
      router.push(`/feedback/${status}`);
      setId("");
    } else {
      const status = "deleted";
      router.push(`/feedback/${status}`);
      setId("");
    }
  }

  return (
    <div className="grid place-content-center gap-47 min-h-[100vh] text-3xl bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 p-10"
      >
        <label htmlFor="employeeName">Submit Info</label>
        <input
          name="employeeName"
          type="text"
          placeholder="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          className="px-6 py-2 bg-slate-700 rounded-2xl"
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          className="px-6 py-2 bg-slate-700 rounded-2xl"
        />
        <button type="submit" className="px-6 py-2 bg-slate-700 rounded-2xl">
          Enroll
        </button>
      </form>
      <form
        onSubmit={handleDelete}
        className="flex flex-col justify-center items-center gap-5
         p-10 bg-gradient-to-r from-slate-900 to-slate-800"
      >
        <label htmlFor="id">Delete Info</label>
        <input
          type="text"
          name="id"
          placeholder="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="px-6 py-2 bg-slate-700 rounded-2xl"
        />

        <button type="submit" className="px-6 py-2 bg-slate-700 rounded-2xl">
          Delete
        </button>
      </form>
    </div>
  );
}
