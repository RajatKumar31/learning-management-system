"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useSearchParams } from "next/navigation";

export default function SignInComponent() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const isCheckoutPage = searchParams.get("showSignUp") !== null;
    const courseId = searchParams.get("id");

    const signUpUrl = isCheckoutPage
        ? `/checkout?step=1&id=${courseId}&showSignUp=true`
        : "/signup";

    const getRedirectUrl = () => {
        if (isCheckoutPage) {
            return `/checkout?step=2&id=${courseId}`;
        }
        const userType = user?.publicMetadata?.userType as string;
        if (userType === "teacher") {
            return "/teacher/courses";
        }
        return "/user/courses";
    };

    return (
        <SignIn
            appearance={{
                baseTheme: dark,
                elements: {
                    rootBox: "flex justify-center items-center py-5",
                    cardBox: "!shadow-none",
                    card: "!bg-[#25262F] w-full !shadow-none",
                    footer: {
                        background: "#25262F",
                        padding: "0rem 2.5rem",
                        "&>div>div:nth-child(1)": { background: "#25262F" },
                    },
                    formFieldLabel: "!text-[#d2d2d2] font-normal",
                    formButtonPrimary:
                        "!bg-[#7878fc] !text-[#ffffff] !hover:bg-[#9898fd] !shadow-none",
                    formFieldInput:
                        "!bg-[#1B1C22] !text-[#d2d2d2] !shadow-none",
                    footerActionLink: "!text-[#5a5be6] !hover:text-[#9898fd]",
                },
            }}
            signUpUrl={signUpUrl}
            forceRedirectUrl={getRedirectUrl()}
            routing="hash"
            afterSignOutUrl="/"
        />
    );
}
