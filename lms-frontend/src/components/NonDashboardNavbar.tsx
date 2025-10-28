"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { dark } from "@clerk/themes";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  console.log("userRole : ", user?.publicMetadata);
  return (
    <nav className="flex w-full justify-center bg-[#1B1C22]">
      <div className="flex w-3/4 items-center justify-between py-8">
        <div className="flex items-center justify-between gap-14">
          <Link
            href="/"
            className="text-lg font-bold text-white hover:text-[#6e6e6e] sm:text-xl"
            scroll={false}
          >
            LMS
          </Link>
          <div className="flex items-center gap-4">
            <div className="group relative">
              <Link
                href="/search"
                className="hover:text-white-50 rounded-xl bg-[#25262F] py-3 pr-6 pl-10 text-sm text-[#6e6e6e] transition-all duration-300 hover:bg-[#3d3d3d] sm:py-4 sm:pr-20 sm:pl-14 sm:text-base"
                scroll={false}
              >
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
              <BookOpen
                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#6e6e6e] transition-all duration-300 sm:left-5"
                size={18}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 sm:h-8 sm:w-8">
            <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-blue-500 sm:h-2 sm:w-2"></span>
            <Bell className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
          </button>
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: dark,
                elements: {
                  userButtonOuterIdentifier: "text-[#6e6e6e]",
                  userButtonBox: "scale-90 sm:scale-100",
                },
              }}
              showName={true}
              userProfileMode="navigation"
              userProfileUrl={
                userRole === "teacher" ? "/teacher/profile" : "/user/profile"
              }
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/signin"
              className="rounded-md border-[1px] border-[#6e6e6e] px-3 py-1.5 text-sm text-[#6e6e6e] hover:bg-[#3d3d3d] hover:text-[#d2d2d2] sm:px-4 sm:py-2 sm:text-base"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm hover:bg-[#9898fd] hover:text-[#1B1C22] sm:px-4 sm:py-2 sm:text-base"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NonDashboardNavbar;
