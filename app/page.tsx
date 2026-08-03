import Image from "next/image";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <TooltipProvider>
        <Button>hel</Button>
      </TooltipProvider>
    </div>
  );
}
