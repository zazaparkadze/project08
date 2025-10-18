import HomeButton from "../../../ui/HomeButton";

interface FeedbackPageProps {
  params: Promise<{ status: string }>;
}

export function generateStaticParams() {
  return [{ status: "deleted" }, { status: "completed" }];
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { status } = await params;
  return (
    <div className="grid place-content-center min-h-[100vh] text-3xl bg-slate-900 gap-10">
      <p> Thank You</p>
      <p>
        {" "}
        Feedback Status:{" "}
        {status.replace(/^./, () => status.charAt(0).toUpperCase())}{" "}
      </p>
      <HomeButton />
    </div>
  );
}
