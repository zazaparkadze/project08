import Link from "next/link";
import { FaFacebook, FaMailBulk, FaLinkedin, FaGithub } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="flex justify-evenly bg-slate-700 text-white/80 py-1.5 text-shadow-black">
      <div className="group">
        <h1 className="flex text-3xl hover:text-white">
          <Link href={"http://project02-gold.vercel.app"} target="_blank">
            Zaza Parkadze
          </Link>
        </h1>

        <div
          className="absolute
           text-xl group-hover:opacity-100 group-hover:visible group-hover:text-black/100
           bg-gray-300 text-black/20 font-medium font-mono rounded-md py-1 px-2 top-14 left-auto
           opacity-0 transition-all duration-3000 z-50 group-hover:mx-auto"
        >
          <ul>
            <li className="hover:underline">
              <Link href={"http://project01-gold.vercel.app"} target="_blank">
                JsonPlaceholder
              </Link>
            </li>
            <li className="hover:underline">
              <Link href={"http://project02-gold.vercel.app"} target="_blank">
                WikiRocket
              </Link>
            </li>
            <li className="hover:underline">
              <Link
                href={"http://project03-gold-mocha.vercel.app"}
                target="_blank"
              >
                Weather Api
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex text-3xl gap-3 pt-1 ">
        <p className=" hover:text-white">
          {" "}
          <Link href={"https://facebook.com/zaza.parkadze"} target="_blank">
            <FaFacebook />
          </Link>
        </p>

        <p className=" hover:text-white group">
          {" "}
          <Link href={"https://github.com/zazaparkadze"} target="_blank">
            {" "}
            <FaGithub />
          </Link>
          <span
            className="absolute group-hover:opacity-100 group-hover:visible group-hover:text-black text-[16px]
           bg-gray-300 text-black/20 font-thin font-mono rounded-md py-2 px-2 top-14 left-auto
           opacity-0 transition-all duration-1000 z-50 group-hover:mx-auto"
          >
            github code
          </span>
        </p>
        <p className=" hover:text-white">
          {" "}
          <Link href={"mailto:givi@parkadze.com"}>
            {" "}
            <FaMailBulk />
          </Link>
        </p>

        <p className=" hover:text-white">
          <Link
            href={"http://linkedin.com/in/zaza-parkadze-304256103"}
            target="_blank"
          >
            <FaLinkedin />
          </Link>
        </p>
      </div>
    </nav>
  );
}
