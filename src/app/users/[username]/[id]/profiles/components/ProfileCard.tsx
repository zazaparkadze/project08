import React from "react";
import Image from "next/image";
/* import sharpResize from "@/lib/sharpResize";
import { readdirSync, existsSync } from "fs"; */

type Prop = {
  empl: EmployeeOld;
};
export default function ProfileCard({ empl }: Prop) {
  /* const fileNames = readdirSync("./public/employees");

  fileNames.map(
    (name) =>
      !existsSync(`./public/${name}`) &&
      sharpResize(`./public/employees/${name}`)
  ); */

  const content = (
    <div
      id={empl.name}
      className="flex flex-col justify-center gap-3 items-center border-2 
    border-amber-500 text-center text-amber-400 rounded-3xl shadow-xl
     shadow-amber-300 w-[375px] h-[425px]  md:last:order-[-1] lg:even:order-[-1]
      lg:[&:nth-child(3)]:bg-gray-400 shrink-0"
    >
      <Image
        src={`/${empl.name}.jpeg`}
        width={225}
        height={225}
        alt="flowers"
        className="block rounded-full border-5 border-double border-amber-300 aspect-square"
      ></Image>
      <p className="text-3xl">{empl.name}</p>
      <p className="text-2xl">{empl.occupation}</p>
    </div>
  );
  return content;
}
