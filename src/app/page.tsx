import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      <Button>Hello world</Button>
    </div>
  );
}
