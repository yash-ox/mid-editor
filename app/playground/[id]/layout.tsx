import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";

export default function PlaygroundFunction({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
