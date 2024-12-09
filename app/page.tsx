"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === "/") router.push("/1");
  }, []);
  return (
   <div>quiz</div>
  );
}
