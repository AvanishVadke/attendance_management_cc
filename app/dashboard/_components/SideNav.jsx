"use client";
import { GraduationCap, Hand, icons, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const { user } = useUser();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icons: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icons: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icons: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icons: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="border-r shadow-sm flex flex-col justify-between mb-1 h-screen">
      <div>
        <div className="p-5 mb">
          <Image
            priority={true}
            src="/cc.png"
            width={180}
            height={50}
            alt="logo"
          />
        </div>
        <hr className="my-5" />

        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex items-center gap-3 p-4 
                text-slate-500 hover:bg-muted cursor-pointer rounded-lg
                ${path === menu.path ? 'bg-muted text-black' : ''}`}
            >
              <menu.icons />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {user && (
        <div className="p-4 border-t mt-auto mb-1 bottom-1">
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <div>
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-slate-500">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideNav;
