"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TriageResultRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/demo/triage/step/4");
  }, [router]);
  return null;
}
