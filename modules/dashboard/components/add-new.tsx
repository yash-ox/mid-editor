"use client";

import { Button } from "@/components/ui/button";
// import { createPlayground } from "@/features/playground/actions";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import TemplateSelectingModel from "./template-selecting-model";
import { createPlayground } from "../actions";

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  } | null>(null);

  const router = useRouter();

  const handleSubmit = async (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  }) => {
    setSelectedTemplate(data);

    const res = await createPlayground(data);
    toast.success("Playground created successfully.");

    setIsModalOpen(false);

    //  TO PUSH USER TO THE CREATED PLAYGROUND
    // router.push(`/playground/${res?.id}`);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
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
            <Plus
              size={30}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#2c47dec9]">Add New</h1>
            <p className="text-sm text-muted-foreground max-w-55">
              Create a new playground
            </p>
          </div>
        </div>

        {/* Dark mode */}
        <div className="relative overflow-hidden hidden dark:block">
          <Image
            src={"/add-new-white.svg"}
            alt="Create new playground"
            width={150}
            height={150}
            className="transition-transform duration-300 "
            draggable={false}
          />
        </div>

        {/* Light mode */}
        <div className="relative overflow-hidden block dark:hidden">
          <Image
            src={"/add-new-black.svg"}
            alt="Create new playground"
            width={150}
            height={150}
            className="transition-transform duration-300 "
            draggable={false}
          />
        </div>
      </div>

      <TemplateSelectingModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddNewButton;
