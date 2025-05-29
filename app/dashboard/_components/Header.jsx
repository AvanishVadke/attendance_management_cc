"use client";
import React from 'react'
import { useUser, UserButton } from "@clerk/nextjs";

function Header() {

  const { user } = useUser();

  return (
    <div className="p-4 shadow-sm border flex justify-between">
      <div>

      </div>
      <div>
        <img src={user.imageUrl} alt="User profile" width={35} height={35} className="rounded-full"/>
      </div>
    </div>
  )
}

export default Header