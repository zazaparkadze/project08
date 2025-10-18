import Image from "next/image";

export default function ProfilePic() {
  return (
    <div>
      <Image
        src={"/images/zaza1.jpg"}
        width={173.6}
        height={204.8}
        alt="Zaza Parkadze"
        className="border-double border-2
         border-white rounded-ee-full"
      />
    </div>
  );
}
