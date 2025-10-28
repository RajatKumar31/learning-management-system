import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  BookOpen,
  Briefcase,
  DollarSign,
  PanelLeft,
  Settings,
  User,
} from "lucide-react";
import Loading from "./Loading";
import { Sidebar } from "./ui/sidebar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AppSidebar() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const navlinks = {
    student: [
      { icon: BookOpen, label: "Courses", href: "/user/courses" },
      { icon: Briefcase, label: "Billing", href: "/user/billing" },
      { icon: User, label: "Profile", href: "/user/profile" },
      { icon: Settings, label: "Settings", href: "/user/settings" },
    ],
    teacher: [
      { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
      { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
      { icon: User, label: "Profile", href: "/teacher/profile" },
      { icon: Settings, label: "Settings", href: "/teacher/settings" },
    ],
  };

  if (!isLoaded) {
    return <Loading />;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  const userType =
    (user.publicMetadata.userType as "student" | "teacher") || "student";

  const currentNavLinks = navlinks[userType];

  return (
    <Sidebar
      collapsible="icon"
      style={{ height: "100vh" }}
      className="border-none bg-[#1B1C22] shadow-lg"
    >
      <SidebarHeader>
        <SidebarMenu className="mt-5 group-data-[collapsible=icon]:mt-7">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => toggleSidebar}
              className="group hover:bg-[#25262F]"
            >
              <div className="group flex h-10 w-full items-center justify-between gap-5 pr-1 pl-3 group-data-[collapsible=icon]:ml-1 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0">
                <div className="flex items-center gap-5">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={25}
                    height={25}
                    className="w-auto transition duration-200 group-data-[collapsible=icon]:group-hover:brightness-75"
                  />
                  <p className="text-lg font-extrabold group-data-[collapsible=icon]:hidden">
                    LMS
                  </p>
                </div>
                <PanelLeft className="h-5 w-5 text-gray-400 group-data-[collapsible=icon]:hidden" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="mt-7 gap-0">
          {currentNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4 hover:bg-[#25262F]",
                  isActive && "bg-gray-800",
                )}
              >
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className={cn(
                    "gap-4 p-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center hover:bg-[#25262F]",
                    !isActive && "text-[#6e6e6e]",
                  )}
                >
                  <Link href={link.href} className="relative flex items-center">
                    <link.icon
                      className={isActive ? "text-[#d2d2d2]" : ""}
                    ></link.icon>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
