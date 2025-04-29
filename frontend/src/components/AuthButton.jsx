import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { UserCircleIcon } from "lucide-react";
import React from "react";

const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <div className="flex items-center justify-center gap-2">
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverFooter: "hidden",
              },
            }}
            afterSignOutUrl="/"
            userProfileMode="modal"
            userProfileProps={{
              additionalNavigationEntries: [
                {
                  label: "Appointment",
                  icon: "calendar",
                  onClick: () => router.push("/appointment"),
                },
              ],
            }}
          />
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button
            variant={"outline"}
            className="px-2 flex items-center justify-center gap-2 border py-1.5 text-sm font-medium text-[#5B3728] cursor-pointer hover:text-blue-500 rounded-full shadow-none"
          >
            <UserCircleIcon />
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButton;
