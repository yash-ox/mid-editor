import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10 select-none">
      <div className="flex flex-col justify-center items-center my-5 ">
        <Image
          src={"/hero.svg"}
          alt="Hero-Section"
          height={500}
          width={400}
          className="h-50 w-100"
          draggable={false}
        />

        <h1 className=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-linear-to-r from-[#5148c7] to-[#302a85] ">
          Mid Editur
        </h1>
      </div>

      <p className="pt-4 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
        A powerful browser-based development environment that lets you write
        code, install packages, run your projects, and see your changes
        instantly — without leaving your browser.
      </p>
      <Link href={"/dashboard"}>
        {/* Light mode */}
        <div className="dark:hidden">
          <Button
            variant={"brand"}
            className="mb-4 bg-[#5148c7] shadow-2xl shadow-gray-600 "
            size={"lg"}
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Dark mode */}
        <div className="hidden dark:block">
          <Button
            variant={"brand"}
            className="mb-4 bg-[#5148c7] shadow-2xl shadow-gray-600 "
            size={"lg"}
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </Link>
    </div>
  );
}
