"use client"; // Ensures this is a client component

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization } from "@clerk/nextjs";
import { useMutation, useQueries, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const {organization} = useOrganization();
  organization?.id
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, 
    organization?.id ? {orgId :organization.id} : "skip"
  );

  const handleCreateFile = () => {

    if(!organization) return
    createFile({ name: "hello world",
      orgId:organization.id
     })
      .then(() => {
        console.log("File created successfully");
      })
      .catch((error) => {
        console.error("Error creating file:", error);
      });
  };

  return (
    <div className="text-center">
      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      <Button>Hello world</Button>

      <button onClick={handleCreateFile}>Click Me</button>

      {files?.map((file) => (
        <div key={file._id}>{file.name}</div>
      ))}
    </div>
  );
}
