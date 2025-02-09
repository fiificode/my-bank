"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Button onClick={() => router.push("/overview")}>Dashboard</Button>
    </div>
  );
};

export default LoginPage;
