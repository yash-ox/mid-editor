"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const screenshots = [
  {
    src: "/screenshots/home.svg",
    alt: "Home page",
  },
  //   {
  //     src: "/screenshots/editor.png",
  //     alt: "Code editor",
  //   },
  //   {
  //     src: "/screenshots/dashboard.png",
  //     alt: "Dashboard",
  //   },
];

export default function ScreenshotCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <Image
          src={screenshots[current].src}
          alt={screenshots[current].alt}
          width={1200}
          height={700}
          className="block w-full h-auto"
          draggable={false}
        />
      </div>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full ${
              current === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
