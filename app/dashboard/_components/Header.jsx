"use client";

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="p-4 md:p-6 shadow-sm border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20 flex justify-between items-center">
      {/* Left side - can add breadcrumbs or page title here */}
      <div className="flex items-center">
        <h1 className="hidden sm:block text-lg font-semibold text-foreground">
          Coder's Club Portal
        </h1>
      </div>
      
      {/* Right side - User Button */}
      <div className="flex items-center space-x-4">
        <div className="scale-110 origin-center">
          {isClient ? (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 md:w-9 md:h-9"
                }
              }}
            />
          ) : (
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-muted animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
