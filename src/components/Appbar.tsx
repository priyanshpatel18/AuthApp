import React from "react";
import { ThemeToggler } from "./ThemeToggler";

export const Appbar = () => {
  return (
    <div className="flex justify-between p-[1rem]">
      <span>Auth App</span>
      <ThemeToggler />
    </div>
  );
};
