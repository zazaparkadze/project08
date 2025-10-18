import HomeButton from "../../../ui/HomeButton";
type Params = {
  params: Promise<{ paramsString: string }>;
};
export default async function ThankYou({ params }: Params) {
  const { paramsString } = await params;

  const data = decodeURIComponent(paramsString)
    .split("&")
    .map((e) => e.split("="));

  const { name, email, phone } = Object.fromEntries(data);
  const content = (
    <div className="grid place-content-center min-h-screen text-3xl">
      <div className="flex flex-col gap-8">
        <p>
          <span className="text-amber-600 pr-4">
            {name.replaceAll("+", " ")}
          </span>{" "}
          Thank you for your feedback!
        </p>
        <p>
          Your email:
          <br />
          <span className="text-amber-600 pr-4">{email}</span>
          <br />
          and your phone number: <br />
          <span className="text-amber-600 pr-4">{phone}</span>
          <br />
          will be kept confidential in our database.
        </p>
        <p>Gridline Team</p>
        <br />
        <br />
        <br />
        <HomeButton />
      </div>
    </div>
  );

  return content;
}
