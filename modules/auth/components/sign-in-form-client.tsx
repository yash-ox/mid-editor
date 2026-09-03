import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "@/auth";
import ScreenshotCarousel from "./screenshot-carousel";
import Image from "next/image";

async function handleGoogleSignIn() {
  "use server";
  await signIn("google");
}

async function handleGithubSignIn() {
  "use server";
  await signIn("github");
}

const SignInFormClient = () => {
  return (
    <main className="w-full min-h-screen bg-[#252629] text-white">
      <div className="mx-auto flex min-h-screen">
        {/* ================= LEFT ================= */}

        <section className="flex w-full items-center justify-center px-6 py-12 lg:w-[30%]">
          <div className="w-full max-w-105">
            {/* Logo / Illustration */}

            <div className="mb-6 flex justify-center">
              <Image
                src="/login.svg"
                alt="Login illustration"
                width={300}
                height={300}
                loading="eager"
                className="h-55 w-55 scale-x-[-1] "
                draggable={false}
              />
            </div>

            {/* Auth Card */}
            <Card className="overflow-hidden border-white/10 bg-[#151515] shadow-2xl shadow-black/20">
              <CardHeader className="px-7 pt-4 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Welcome back
                </CardTitle>

                <CardDescription className="mt-2 mb-2 text-gray-400">
                  Sign in to continue to your workspace
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 px-7 pb-3">
                {/* Google */}
                <form action={handleGoogleSignIn}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="h-11 w-full border-white/10 bg-[#202020] text-white hover:bg-[#292929] hover:text-white"
                  >
                    <FaGoogle className="mr-3 h-4 w-4" />
                    Continue with Google
                  </Button>
                </form>

                {/* GitHub */}
                <form action={handleGithubSignIn}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="h-11 w-full border-white/10 bg-[#202020] text-white hover:bg-[#292929] hover:text-white"
                  >
                    <FaGithub className="mr-3 h-4 w-4" />
                    Continue with GitHub
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="border-t border-white/10 bg-[#181818] px-7 py-5">
                <p className="w-full text-center text-xs leading-5 text-gray-500">
                  By continuing, you agree to our{" "}
                  <a
                    href="#"
                    className="text-gray-400 underline underline-offset-2 hover:text-white"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-gray-400 underline underline-offset-2 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </CardFooter>
            </Card>

            {/* Small branding */}
            <p className="mt-6 text-center text-xs text-gray-600">
              © 2026 Mild Editor
            </p>
          </div>
        </section>

        {/* ================= DIVIDER ================= */}

        <div className="hidden w-px bg-white/6 lg:block" />

        {/* ================= RIGHT ================= */}

        <section className="relative hidden flex-1 items-center justify-center overflow-hidden px-10 py-12 lg:flex">
          {/* Background glow */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple blur-3xl" />

          <div className="relative z-10 w-full max-w-175">
            {/* Heading */}

            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-gray-400">
                ✦ Built for developers
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white">
                Your development workspace.
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-400">
                Build, edit and preview your projects directly in your browser
                with everything you need in one place.
              </p>
            </div>

            {/* Screenshot */}

            <div className="rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl shadow-black/40">
              <div className="overflow-hidden rounded-xl">
                <ScreenshotCarousel />
              </div>
            </div>

            {/* Feature indicators */}

            <div className="mt-6 flex justify-center gap-8 text-xs text-gray-500">
              <span>⌘ Browser IDE</span>
              <span>•</span>
              <span>⚡ Live Preview</span>
              <span>•</span>
              <span>◈ Projects</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignInFormClient;
