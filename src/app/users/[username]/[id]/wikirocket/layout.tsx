import type { Metadata } from "next";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Wiki-Rocket-pedia",
  description: "Next app, wikipedia api ",
};

export default function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`antialiased bg-slate-700 flex flex-col min-h-[100vh]`}>
      <div className="sticky top-0">
        <NavBar />
      </div>
      {children}
    </div>
  );
}
