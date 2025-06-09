"use client";

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <div></div>
      
      {/* Wrap UserButton and scale it up */}
      <div className="scale-125 origin-center">
        {isClient ? (
          <UserButton />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        )}
      </div>
    </div>
  );
}

export default Header;
