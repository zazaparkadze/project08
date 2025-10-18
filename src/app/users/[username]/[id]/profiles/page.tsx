import ProfileCard from "./components/ProfileCard";
import HomeButton from "@/ui/HomeButton";
import employeesJson from "@/ui/employees.json";

export default function Profiles() {
  const employees: EmployeeOld[] = employeesJson;
  return (
    <div className="flex flex-col min-h-screen bg-slate-500 [&>*:nth-child(4)]:items-end">
      <h1 className="text-6xl bg-slate-500 text-center py-3">Profiles</h1>
      <h1 className="flex justify-evenly text-2xl bg-slate-600 text-center py-3 md:text-4xl md:brightness-120 lg:hidden">
        {employees.map((emp) => (
          <span key={employees.indexOf(emp)}>
            <a href={`#${emp.name}`} className="hover:brightness-50">
              {" "}
              {emp.name}
            </a>
          </span>
        ))}
      </h1>
      <main className="flex flex-col flex-grow-1 justify-center items-center gap-6 bg-slate-500 md:flex-row md:flex-wrap">
        {employees.map((emp) => (
          <ProfileCard empl={emp} key={employees.indexOf(emp)} />
        ))}
      </main>
      <div className="flex flex-col m-6">
        <HomeButton />
      </div>
    </div>
  );
}
