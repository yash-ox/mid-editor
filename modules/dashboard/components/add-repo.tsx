import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const AddRepo = () => {
  return (
    <>
      <div
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:scale-[1.02]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#2c47dec9] group-hover:text-[#2c47dec9] transition-colors duration-300"
            size={"icon"}
          >
            <ArrowDown
              size={30}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#2c47dec9]">
              Open Github Repository
            </h1>
            <p className="text-sm text-muted-foreground max-w-55">
              Work with your repositories in our editor
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Light mode */}
          <Image
            src="/github-dark-light.svg"
            alt="Github Logo"
            width={150}
            height={150}
            className="w-37.5 h-37.5 transition-transform duration-300 block dark:hidden"
            draggable={false}
          />

          {/* Dark mode */}
          <Image
            src="/github-light.svg"
            alt="Github Logo"
            width={150}
            height={150}
            className="w-37.5 h-37.5 transition-transform duration-300 hidden dark:block"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
};

export default AddRepo;
