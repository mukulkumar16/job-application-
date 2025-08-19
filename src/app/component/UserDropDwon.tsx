// @ts-nocheck
"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@radix-ui/themes";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Addjob from "../(group)/Addjob";
import DeleteCompany from "./DeleteCompany";

export default function UserDropDown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isLoggedIn = user;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className="cursor-pointer p-1 sm:p-2">
          <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white bg-green-400 rounded-full" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white text-black border shadow-xl rounded-md p-2 w-48 sm:w-56 max-w-[90vw] z-[9999]"
          sideOffset={8}
          align="end"
        >
          {isLoggedIn && (
            <>
              {user?.data.role === "admin" && (
                <>
                  {!user?.data.company && (
                    <DropdownMenu.Item className="p-2 text-sm hover:bg-gray-100 rounded-md">
                      <Link href="/add-company">Add Company</Link>
                    </DropdownMenu.Item>
                  )}

                  {user?.data.company && (
                    <DropdownMenu.Item className="p-2 text-sm hover:bg-gray-100 rounded-md">
                      <Link href={`/company/${user?.data?.company?.id}`}>View Company</Link>
                    </DropdownMenu.Item>
                  )}
                </>
              )}

              {user.data.company && <Addjob />}

              <DropdownMenu.Item className="p-2 text-sm hover:bg-gray-100 rounded-md">
                <Link href={"/view-job-applicant"}>Your job applications</Link>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="my-1 border-t border-gray-200" />

              <DropdownMenu.Item
                className="p-2 text-sm hover:bg-gray-100 rounded-md text-red-500"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenu.Item>

              <DropdownMenu.Item className="p-2 text-sm text-red-500 hover:bg-red-100 rounded-md">
                <DeleteCompany id={user?.data?.company?.id} />
              </DropdownMenu.Item>
            </>
          )}

          {!isLoggedIn && (
            <DropdownMenu.Item className="p-2 text-sm hover:bg-gray-100 rounded-md">
              <Link href={"/login"}>Login</Link>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
