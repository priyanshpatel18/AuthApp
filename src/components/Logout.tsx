"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <Button
      size={"sm"}
      variant="outline"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
