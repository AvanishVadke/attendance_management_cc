"use client";
import { GraduationCap, Hand, icons, LayoutIcon, Settings, Menu, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  ];
  const path = usePathname();

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-background border shadow-sm"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-background border-r shadow-sm 
        flex flex-col justify-between z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:z-auto
      `}>        <div>
          <div className="p-5 mb">
            <Link href="/">
              <Image
                priority={true}
                src="/cc.png"
                width={180}
                height={50}
                alt="logo"
                className="cursor-pointer"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>
          <hr className="my-5" />

          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.id} onClick={handleLinkClick}>
              <h2
                className={`flex items-center gap-3 p-4 mx-3 mb-2
                  text-slate-500 hover:bg-muted cursor-pointer rounded-lg transition-colors
                  ${path === menu.path ? 'bg-muted text-black dark:text-white' : ''}`}
              >
                <menu.icons className="w-5 h-5" />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        {user && (
          <div className="p-4 border-t mt-auto mb-1">
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{user.fullName}</p>
                <p className="text-xs text-slate-500 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SideNav;
