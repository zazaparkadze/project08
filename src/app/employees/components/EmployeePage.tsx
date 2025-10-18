type Props = {
  data: Promise<Employee[]>;
};

export default async function EmployeePage({ data }: Props) {
  const employees = await data;
  return employees.map((employee) => (
    <section
      key={employee.id}
      className="text-3xl text-amber-500 min-w-[75vw] pt-25 pl-25"
    >
      <p className="brightness-110">Employee {employee.id}</p>
      <p>First Name: {employee.firstname}</p>
      <p>Last Name: {employee.lastname}</p>
      <br />
      <p>Email: {`${employee.lastname}_${employee.firstname}@parkadze.com`}</p>
      <br />
      <hr />
    </section>
  ));
}
