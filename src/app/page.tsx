import Link from "next/link";
import Watch from "./blog/components/Watch";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Watch />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>
          <Link href={"login"}>Login </Link>
        </p>
        <p>
          <Link href={"register"}>Register </Link>
        </p>
        <p>
          <Link href={"employees"}>Employees</Link>
        </p>
        <p>
          <Link href={"blog"}>Blog</Link>
        </p>
        <p>
          <Link href={"mongoposts"}>Posts</Link>
        </p>
        <div>
          <Link href={"visitorfeedback"}>Feedback</Link>
        </div>
        <div>
          <Link href={"reedfeedbacks"}>Reed Feedbacks</Link>
        </div>
      </main>
    </div>
  );
}
