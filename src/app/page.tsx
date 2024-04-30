"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

const Home = () => {
  return (
    <div>
      <Button
        onClick={() => {
          toast.success("Success", {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          toast.error("Error");
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          toast.loading("Loading...");
        }}
      >
        Loading
      </Button>
      <Button
        onClick={() => {
          toast.warning("Warning");
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          toast.info("Information...");
        }}
      >
        Info
      </Button>
    </div>
  );
};

export default Home;
