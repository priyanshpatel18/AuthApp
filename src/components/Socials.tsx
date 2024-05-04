import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Socials() {
  return (
    <div className="flex flex-col gap-8">
      <Button
        variant="outline"
        onClick={async () => {
          await signIn("github");
        }}
      >
        <span className="text-[1.1rem]">Login with Github</span>
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await signIn("google");
        }}
      >
        <span className="text-[1.1rem]">Login with Google</span>
      </Button>
    </div>
  );
}
