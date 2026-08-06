import Image from "next/image";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import UserButton from "@/modules/auth/components/user-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TooltipProvider>
        <Button>hel</Button>
      </TooltipProvider>
      <UserButton />
    </div>
  );
}
