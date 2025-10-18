import getAllFeedbacks from "@/lib/getAllFeedbacks";
import HomeButton from "../../ui/HomeButton";

export const dynamic = "force-dynamic";

export default async function page() {
  const rawData = await getAllFeedbacks();
  const collectedData: Feedback[] = JSON.parse(rawData);

  const content = collectedData.map((feedback) => (
    <div key={feedback.textContent} className="pl-60">
      <p>Name: &nbsp;&nbsp;&nbsp;{feedback.name}</p>
      <p>Email: &nbsp;&nbsp;&nbsp;{feedback.email}</p>
      <p>Phone Number:&nbsp;&nbsp;&nbsp;{feedback.phone}</p>
      <p>Content: &nbsp;&nbsp;&nbsp;{feedback.textContent}</p>
      <br />
    </div>
  ));
  return (
    <div>
      <div className="sticky top-0">
        <HomeButton />
      </div>
      {content}
    </div>
  );
}
