"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";
import { User } from "lucide-react";

export default function HeaderProfileBtn() {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Profile"
              labelIcon={<User className="size-4" />}
              href="/profile"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
}
