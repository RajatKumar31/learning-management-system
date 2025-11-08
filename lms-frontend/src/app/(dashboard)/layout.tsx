"use client";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [courseId, setCourseId] = useState<string | null>(null);
    const { user, isLoaded } = useUser();

    // TODO : handle use effect isCoursePage

    if (!isLoaded) {
        return <Loading />;
    }
    if (!user) {
        return <div>Please sign in to access this page.</div>;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#1B1C22]">
                {/*Sidebase will go here*/}
                <AppSidebar />
                <div className="flex flex-1 overflow-hidden">
                    {/*Chapter sidebar will go here*/}
                    <div
                        className={cn(
                            "min-h-screen flex-grow overflow-y-auto bg-[#25262F] transition-all duration-500 ease-in-out",
                        )}
                        style={{ height: "100vh" }}
                    >
                        <main className="px-8 py-4">{children}</main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
